import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {requestImageStoragePermission} from '../../../../utils/storage';

const {width, height} = Dimensions.get('window');

const ImageModal = ({visible, imgPath, setVisibility}) => {
  async function downloadImage() {
    await requestImageStoragePermission(imgPath);
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisibility(false);
            }}>
            <FontAwesome name="close" color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              downloadImage();
            }}>
            <FontAwesome5 name="download" color="white" size={30} />
          </TouchableOpacity>
        </View>

        <FastImage
          style={{width: width, height: width, marginTop: height * 0.15}}
          source={{
            uri: imgPath,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
});
