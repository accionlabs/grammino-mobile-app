import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import COMMON_STYLES from '../../../assets/styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {imageEnvironment} from '../../../environment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoModal from './VideoModal';

const VideoMessage = ({fromMe, message}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const {time, ipfsPath} = message;

  return (
    <TouchableOpacity onPress={() => setVideoOpen(true)}>
      <View style={styles.placeholders}>
        {isLoading ? (
          <ActivityIndicator size="large" color={'#ccc'} />
        ) : hasError ? (
          <MaterialIcons name="broken-image" color={'#ccc'} size={30} />
        ) : null}
      </View>
      <View style={styles.playIcon}>
        <AntDesign name="play" color="white" size={30} />
      </View>
      <View
        style={[
          COMMON_STYLES.message,
          fromMe ? COMMON_STYLES.sentMessage : COMMON_STYLES.recievedMessage,
        ]}>
        <FastImage
          style={styles.video}
          source={{
            uri: imageEnvironment + ipfsPath,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={() => setIsLoading(true)}
          onError={() => setHasError(true)}
          onLoadEnd={() => setIsLoading(false)}
        />

        <Text
          style={
            fromMe
              ? COMMON_STYLES.sentMessageTimestamp
              : COMMON_STYLES.recievedMessageTimestamp
          }>
          {moment(time).format('lll').toString()}
        </Text>
      </View>
      <VideoModal
        visible={videoOpen}
        setVisibility={setVideoOpen}
        videoPath={imageEnvironment + ipfsPath}
      />
    </TouchableOpacity>
  );
};

export default VideoMessage;

const styles = StyleSheet.create({
  video: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholders: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  playIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
