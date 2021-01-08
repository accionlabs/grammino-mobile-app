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
import COMMON_STYLES from '../../../assets/styles';
import {useMountEffect} from '../../../utils/hooks';
import {entityOperations} from '../../../store/state/entity';
import CommandBox from '../../components/CommandBox';
import {MESSAGE_FACTORY} from '../../../constants/messages';
const {width, height} = Dimensions.get('window');

const EntityChat = ({route}) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.lang);
  const entityConversation = useSelector((state) => state.entity.conversation);
  const {entityId, name} = route.params;
  const scrollViewRef = useRef(null);

  useMountEffect(() => {
    dispatch(entityOperations.loadEntityConversation(entityId));
    return () => {
      dispatch(entityOperations.clearEntityConversation());
    };
  });

  const renderMessages = () => {
    return entityConversation.data.map((msg, index) => {
      const hasMatched = msg.type !== 'photo';
      return (
        <View
          style={{
            flexDirection: hasMatched ? 'row-reverse' : 'row',
          }}
          key={`msg-${index}`}>
          {msg.type === 'image' || msg.type === 'photo' ? (
            <ImageMessage fromMe={hasMatched} message={msg} />
          ) : msg.type === 'text' ? (
            <TextMessage fromMe={hasMatched} message={msg} />
          ) : msg.type === 'video' ? (
            <VideoMessage fromMe={hasMatched} message={msg} />
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView>
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
          <Header title={name} enableGoBack={true} />
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollViewRef.current.scrollToEnd({animated: false});
            }}
            contentContainerStyle={[COMMON_STYLES.chatContainer]}>
            {entityConversation.isLoading ? (
              <Text>{MESSAGE_FACTORY[language].loading}</Text>
            ) : entityConversation.hasError ? (
              <Text>{entityConversation.errMsg}</Text>
            ) : entityConversation.data.length === 0 ? (
              <Text>{MESSAGE_FACTORY[language].start_conversation}</Text>
            ) : (
              renderMessages()
            )}
          </ScrollView>
          <CommandBox entityId={entityId} />
        </Block>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EntityChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
