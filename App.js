import {materialTheme} from './src/constants';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/navigation/Screens';
import {
  connectSocket,
  disconnectSocket,
  attachEventExecutor,
} from './src/services/socket';
import {useNetInfo} from '@react-native-community/netinfo';
// Before rendering any navigation stack
import NetworkError from './src/views/screens/NetworkError';
import AppIndicator from './src/views/components/AppIndicator';
import {navigationRef} from './src/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {appOperations} from './src/store/state/app';
import {useMountEffect} from './src/utils/hooks';
import {Block, GalioProvider} from 'galio-framework';

const App = () => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const [isConnectedToWLAN, setIsConnectedToWLAN] = useState(false);
  const phoneNumber = useSelector((state) => state.app.auth.phone);

  useMountEffect(() => {
    console.log('App mounted');
    connectSocket();

    setTimeout(() => {
      console.log('Attaching listeners...');
      attachEventExecutor('new_network_msg', (data) => {
        console.log('New Public Message!', data);
        if (data.msg.sender !== phoneNumber)
          dispatch(appOperations.handleNewPublicMessage(data));
      });

      attachEventExecutor('new_conversation', (data) => {
        console.log('New Conversation!', data);
        dispatch(appOperations.handleNewConversation(data));
      });

      attachEventExecutor('new_msg', (data) => {
        console.log('New Private Message!', data);
        if (data.msg.sender !== phoneNumber)
          dispatch(appOperations.handleNewPrivateMessage(data));
      });

      attachEventExecutor('new_entity_msg', (data) => {
        console.log('New Entity Message!', data);
        dispatch(appOperations.handleNewEntityMessage(data));
      });
    }, 2000);

    return () => {
      console.log('App unmounted');
      disconnectSocket();
    };
  });

  useEffect(() => {
    if (netInfo.type === 'unknown') {
      setIsConnectedToWLAN(false);
    } else if (netInfo.type === 'wifi') {
      setIsConnectedToWLAN(true);
      dispatch(appOperations.validateSession());
    } else {
      setIsConnectedToWLAN(false);
    }
  }, [netInfo.type]);

  return (
    <NavigationContainer ref={navigationRef}>
      <GalioProvider theme={materialTheme}>
        <Block flex>
          <AppIndicator />
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {isConnectedToWLAN ? <Screens /> : <NetworkError />}
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
};

export default App;
