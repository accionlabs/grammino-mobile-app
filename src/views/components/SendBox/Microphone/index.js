import {Block} from 'galio-framework';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COMMON_STYLES from '../../../../assets/styles';

const {width} = Dimensions.get('window');

const recording_settings = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
  },
  ios: {
    extension: '.m4a',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 8000,
    numberOfChannels: 1,
    bitRate: 128000,
  },
};

function getMMSSFromMillis(millis) {
  const totalSeconds = millis / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);

  const padWithZero = (number) => {
    const string = number.toString();
    if (number < 10) {
      return '0' + string;
    }
    return string;
  };
  return padWithZero(minutes) + ':' + padWithZero(seconds);
}

function Microphone(props) {
  const [recording, setRecording] = useState(null);
  const [recordingArr, setRecordingArr] = useState([]);
  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    recordingDuration: null,
  });
  let [isMicrophonePopUpVisible, setIsMicrophonePopUpVisible] = useState(false);

  recordingSettings = Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

  function updateRecordingStatus(status) {
    if (status.canRecord) {
      setRecordingStatus({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      setRecordingStatus({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
    }
  }

  async function startRecording() {
    setRecording(null);
    try {
      console.log('Requesting permissions..');
      const permission = await Audio.requestPermissionsAsync();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'ReactNativeCode Audi Record Permission',
          message: 'ReactNativeCode bla.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Audi Record Per::', granted);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log('Starting recording..');
        const new_recording = new Audio.Recording();
        await new_recording.prepareToRecordAsync(recording_settings);
        new_recording.setOnRecordingStatusUpdate(updateRecordingStatus);
        status = await new_recording.startAsync();
        setRecording(new_recording);
        console.log('Recording started');
      } else {
        console.log('Recording not started');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    status = await recording.stopAndUnloadAsync();
    updateRecordingStatus(status);
    const uri = recording.getURI();
    setRecordingArr(recordingArr.concat(uri));
    setRecording(null);
    console.log('Recording stopped and stored at', uri);
    return uri;
  }

  async function saveRecording() {
    let uri = await stopRecording();
    let fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      let fileObj = {
        fileName: uri.split('/').pop(),
        fileSize: fileInfo.size,
        uri: uri,
        type: 'audio/m4a',
      };
      props.recordingUri(fileObj);
    }
  }

  const renderModal = isMicrophonePopUpVisible ? (
    <Modal
      visible={isMicrophonePopUpVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        stopRecording();
        setIsMicrophonePopUpVisible(false);
      }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          stopRecording();
          setIsMicrophonePopUpVisible(false);
        }}>
        <Block space="between" style={styles.attachment}>
          <TouchableOpacity
            onPress={() => {
              saveRecording();
              setIsMicrophonePopUpVisible(false);
            }}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <View style={[styles.buttons, COMMON_STYLES.shadow]}>
              <MaterialCommunityIcons name="send" size={25} color="green" />
            </View>
          </TouchableOpacity>
          <Text style={styles.timestamp}>
            {getMMSSFromMillis(recordingStatus.recordingDuration)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              stopRecording();
              setIsMicrophonePopUpVisible(false);
            }}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <View style={[styles.buttons, COMMON_STYLES.shadow]}>
              <MaterialCommunityIcons name="close" color="red" size={25} />
            </View>
          </TouchableOpacity>
        </Block>
      </TouchableOpacity>
    </Modal>
  ) : null;

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          startRecording();
          setIsMicrophonePopUpVisible(true);
        }}
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
        <View style={{padding: 12}}>
          <FontAwesome name="microphone" size={25} color="#4A4A4A" />
        </View>
      </TouchableOpacity>
      {renderModal}
    </View>
  );
}

export default Microphone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ButtonStyle: {
    backgroundColor: '#9DEBD9',
    padding: 10,
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
    alignItems: 'center',
  },
  buttons: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  timestamp: {
    fontSize: 20,
    fontWeight: '600',
  },
});
