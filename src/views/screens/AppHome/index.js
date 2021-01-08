import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Chats from './Chats';
import Contacts from './Contacts';
import Network from './Network';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMountEffect} from '../../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {entityOperations} from '../../../store/state/entity';
import {conversationsOperations} from '../../../store/state/conversations';
import {MESSAGE_FACTORY} from '../../../constants/messages';
const Tab = createMaterialBottomTabNavigator();

function AppHome(props) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.lang);

  useMountEffect(() => {
    dispatch(entityOperations.loadEntities());
    dispatch(conversationsOperations.loadConversations());
    dispatch(conversationsOperations.loadPublicConversations());
  });

  return (
    <Tab.Navigator
      initialRouteName={'Chats'}
      activeColor="#F04E58"
      inactiveColor="#44454E"
      barStyle={{
        backgroundColor: '#fff',
        height: 70,
        justifyContent: 'center',
      }}
      tabBarOptions={{
        adaptive: false,
        labelPosition: 'beside-icon',
      }}>
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: MESSAGE_FACTORY[language].contacts,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="contacts" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: MESSAGE_FACTORY[language].chats,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-processing"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Network"
        component={Network}
        options={{
          tabBarLabel: MESSAGE_FACTORY[language].network,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="folder-network"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

AppHome.propTypes = {};

export default AppHome;
