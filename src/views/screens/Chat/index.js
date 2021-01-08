import {Block} from 'galio-framework';
import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import get from 'lodash/get';
import {useSelector} from 'react-redux';
import Header from '../AppHome/Header';
import COMMON_STYLES from '../../../assets/styles';
import SendBox from '../../components/SendBox';
import ImageMessage from '../../components/ImageMessage';
import TextMessage from '../../components/TextMessage';
import VideoMessage from '../../components/VideoMessage';
import {useMountEffect} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {conversationsOperations} from '../../../store/state/conversations';
import {find, isEmpty} from 'lodash';
import VoiceMessage from '../../components/VoiceMessage';
import Theme from '../../../constants/Theme';
import {MESSAGE_FACTORY} from '../../../constants/messages';

const {width, height} = Dimensions.get('window');

const Chat = ({route}) => {
  const language = useSelector((state) => state.app.lang);
  const conversations = useSelector(
    (state) => state.conversations.private.data,
  );
  const activeConversation = useSelector((state) => state.conversations.active);
  const myPhoneNumber = useSelector((state) => state.app.auth.phone);
  const scrollViewRef = useRef(null);
  const {reciever} = route.params;
  const dispatch = useDispatch();

  useMountEffect(() => {
    const conversation = find(conversations, (conv) => {
      return conv.participants.includes(reciever.phone);
    });

    if (conversation?._id)
      dispatch(
        conversationsOperations.resetUnseenPrivateChatCount(conversation._id),
      );

    if (isEmpty(conversation)) {
      dispatch(conversationsOperations.startConversation(reciever.phone));
    } else {
      dispatch(conversationsOperations.loadConversation(conversation));
    }

    return () => {
      console.log('Clearing active chat');
      dispatch(conversationsOperations.clearActiveChat());
    };
  });

  const renderMessages = () => {
    return activeConversation.data.map((msg, index) => {
      const hasMatched = msg.sender === myPhoneNumber;
      return (
        <View
          style={{
            flexDirection: hasMatched ? 'row-reverse' : 'row',
          }}
          key={`msg-${index}`}>
          {msg.type === 'image' ? (
            <ImageMessage fromMe={hasMatched} message={msg} />
          ) : msg.type === 'text' ? (
            <TextMessage fromMe={hasMatched} message={msg} />
          ) : msg.type === 'video' ? (
            <VideoMessage fromMe={hasMatched} message={msg} />
          ) : msg.type === 'audio' ? (
            <VoiceMessage fromMe={hasMatched} message={msg} />
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={COMMON_STYLES.container}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: 'white',
          height: height,
          width: width,
          justifyContent: 'space-between',
        }}
        behavior="height"
        keyboardVerticalOffset={30}>
        <Block flex style={styles.container}>
          <Header title={get(reciever, `name`, 'User')} enableGoBack={true} />
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollViewRef.current.scrollToEnd({animated: false});
            }}
            contentContainerStyle={[COMMON_STYLES.chatContainer]}>
            {activeConversation.isLoading ? (
              <Text>{MESSAGE_FACTORY[language].loading}</Text>
            ) : activeConversation.hasError ? (
              <Text>{activeConversation.errMsg}</Text>
            ) : activeConversation.data.length === 0 ? (
              <Text>{MESSAGE_FACTORY[language].start_conversation}</Text>
            ) : (
              renderMessages()
            )}
          </ScrollView>
          <SendBox
            target="private"
            conversationId={
              reciever.isContact
                ? null
                : get(activeConversation, `conversation._id`, '')
            }
            reciever={get(reciever, `phone`, '')}
          />
        </Block>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
