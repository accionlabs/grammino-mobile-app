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
import ImageModal from './ImageModal';

const ImageMessage = ({fromMe, message}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const {time, ipfsPath} = message;

  return (
    <TouchableOpacity onPress={() => setImageOpen(true)}>
      <View style={styles.placeholders}>
        {isLoading ? (
          <ActivityIndicator size="large" color={'#ccc'} />
        ) : hasError ? (
          <MaterialIcons name="broken-image" color={'#ccc'} size={30} />
        ) : null}
      </View>
      <View
        style={[
          COMMON_STYLES.message,
          fromMe ? COMMON_STYLES.sentMessage : COMMON_STYLES.recievedMessage,
        ]}>
        <FastImage
          style={styles.image}
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
      <ImageModal
        visible={imageOpen}
        setVisibility={setImageOpen}
        imgPath={imageEnvironment + ipfsPath}
      />
    </TouchableOpacity>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  image: {
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
});
