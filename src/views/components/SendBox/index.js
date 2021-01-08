import {Block, Input} from 'galio-framework';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../../constants/Theme';
import isEmpty from 'lodash/isEmpty';
import {useDispatch, useSelector} from 'react-redux';
import {conversationsOperations} from '../../../store/state/conversations';
import COMMON_STYLES from '../../../assets/styles';
import {pickImage, pickVideo} from '../../../services/media';
import Microphone from './Microphone';
import {MESSAGE_FACTORY} from '../../../constants/messages';
const {width} = Dimensions.get('window');

const SendBox = ({target, conversationId, reciever}) => {
  const [message, setMessage] = useState('');
  const [isAttachmentPopUpVisible, setIsAttachmentPopUpVisible] = useState(
    false,
  );
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.lang);

  const sendText = () => {
    if (target === 'public') {
      dispatch(
        conversationsOperations.postInPublic(
          {
            message,
            conversationId,
            reciever,
            time: Date.now(),
          },
          'text',
        ),
      );
      setMessage('');
    } else if (target === 'private') {
      dispatch(
        conversationsOperations.postInPrivate(
          {
            message,
            conversationId,
            reciever,
            time: Date.now(),
          },
          'text',
        ),
      );
      setMessage('');
    }
  };

  const sendAttachment = (file, type) => {
    if (target === 'public') {
      dispatch(
        conversationsOperations.postInPublic(
          {
            conversationId,
            reciever,
            time: Date.now(),
            file,
          },
          type,
        ),
      );
    } else if (target === 'private') {
      dispatch(
        conversationsOperations.postInPrivate(
          {
            conversationId,
            reciever,
            file,
            time: Date.now(),
          },
          type,
        ),
      );
    }
  };

  const sendAudio = (file) => {
    if (target === 'public') {
      dispatch(
        conversationsOperations.postInPublic(
          {
            conversationId,
            reciever,
            time: Date.now(),
            file,
          },
          'audio',
        ),
      );
    } else if (target === 'private') {
      dispatch(
        conversationsOperations.postInPrivate(
          {
            conversationId,
            reciever,
            file,
            time: Date.now(),
          },
          'audio',
        ),
      );
    }
  };

  const handleImageClick = () => {
    pickImage()
      .then((file) => {
        console.log('File::', file);
        sendAttachment(file, 'image');
      })
      .catch((err) => {
        if (err.error) console.log('Oops!');
      })
      .finally(() => {
        setIsAttachmentPopUpVisible(false);
      });
  };

  const handleVideoClick = () => {
    pickVideo()
      .then((file) => {
        sendAttachment(file, 'video');
      })
      .catch((err) => {
        if (err.error) console.log('Oops!');
      })
      .finally(() => {
        setIsAttachmentPopUpVisible(false);
      });
  };

  return (
    <>
      <Block style={[styles.sendBox]}>
        <Input
          value={message}
          onChangeText={(e) => {
            setMessage(e);
          }}
          color="#4A4A4A"
          placeholder={MESSAGE_FACTORY[language].type_your_message}
          placeholderTextColor="#4A4A4A"
          style={styles.messageInput}
        />
        <View
          style={{
            flexDirection: 'row',
            width: width / 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (!isEmpty(message)) {
                sendText();
              } else console.log('Message is empty');
            }}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <View style={styles.controls}>
              <FontAwesome name="send" size={25} color="#4A4A4A" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsAttachmentPopUpVisible(true)}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <View style={styles.controls}>
              <AntDesign name="paperclip" size={25} color="#4A4A4A" />
            </View>
          </TouchableOpacity>
          <Microphone
            recordingUri={(file) => {
              console.log('RecFile::', file);
              sendAudio(file);
            }}
          />
        </View>
        <Modal
          visible={isAttachmentPopUpVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsAttachmentPopUpVisible(false)}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => setIsAttachmentPopUpVisible(false)}>
            <Block style={styles.attachment}>
              <TouchableOpacity
                onPress={handleImageClick}
                hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <View style={[styles.buttons, COMMON_STYLES.shadow]}>
                  <MaterialCommunityIcons
                    name="image-area"
                    size={25}
                    color="#4A4A4A"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleVideoClick}
                hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <View style={[styles.buttons, COMMON_STYLES.shadow]}>
                  <MaterialCommunityIcons
                    name="video"
                    size={25}
                    color="#4A4A4A"
                  />
                </View>
              </TouchableOpacity>
            </Block>
          </TouchableOpacity>
        </Modal>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  attachment: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: '#eee',
    paddingTop: 20,
    paddingBottom: 20,
    width: width - 20,
    borderRadius: 10,
    flexDirection: 'row',
    margin: 10,
  },
  sendBox: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  messageInput: {
    borderWidth: 0,
    borderColor: Theme.COLORS.WHITE,
    height: 50,
    fontFamily: 'SourceSansPro-Regular',
    backgroundColor: '#FFF',
    borderColor: '#DEDEDE',
    margin: 0,
    width: width - 170,
  },
  controls: {
    padding: 12,
  },
  buttons: {
    padding: 20,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default SendBox;
