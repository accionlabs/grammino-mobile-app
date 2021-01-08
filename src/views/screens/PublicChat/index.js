import React, {useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Block, Text} from 'galio-framework';
import Header from '../AppHome/Header';
import {useDispatch, useSelector} from 'react-redux';
import ImageMessage from '../../components/ImageMessage';
import TextMessage from '../../components/TextMessage';
import VideoMessage from '../../components/VideoMessage';
import VoiceMessage from '../../components/VoiceMessage';
import COMMON_STYLES from '../../../assets/styles';
import SendBox from '../../components/SendBox';
import {
  PUBLIC_CONVERSATION_ID,
  PUBLIC_RECIEVER_ID,
} from '../../../config/public';
import Theme from '../../../constants/Theme';
import {useMountEffect} from '../../../utils/hooks';
import {conversationsOperations} from '../../../store/state/conversations';
import {MESSAGE_FACTORY} from '../../../constants/messages';

const {width, height} = Dimensions.get('window');

const PublicChat = () => {
  const language = useSelector((state) => state.app.lang);

  const dispatch = useDispatch();
  const publicConversations = useSelector(
    (state) => state.conversations.public,
  );
  const myPhoneNumber = useSelector((state) => state.app.auth.phone);
  const scrollViewRef = useRef(null);

  useMountEffect(() => {
    dispatch(conversationsOperations.setPublicScreenActive());
    return () => {
      dispatch(conversationsOperations.resetPublicScreenActive());
    };
  });

  const renderMessages = () => {
    return publicConversations.data.map((msg, index) => {
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
        <Block flex style={[COMMON_STYLES.container, styles.container]}>
          <Header
            title={MESSAGE_FACTORY[language].public_group_name}
            enableGoBack={true}
          />
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollViewRef.current.scrollToEnd({animated: false});
            }}
            contentContainerStyle={[COMMON_STYLES.chatContainer]}>
            {publicConversations.isLoading ? (
              <Text>{MESSAGE_FACTORY[language].loading}</Text>
            ) : publicConversations.hasError ? (
              <Text>{publicConversations.errMsg}</Text>
            ) : publicConversations.data.length === 0 ? (
              <Text>{MESSAGE_FACTORY[language].start_conversation}</Text>
            ) : (
              renderMessages()
            )}
          </ScrollView>
          <SendBox
            target="public"
            conversationId={PUBLIC_CONVERSATION_ID}
            reciever={PUBLIC_RECIEVER_ID}
          />
        </Block>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default PublicChat;
