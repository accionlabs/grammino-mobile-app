import React, {useEffect, useState} from 'react';
import {Block} from 'galio-framework';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import COMMON_STYLES from '../../../assets/styles';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {imageEnvironment} from '../../../environment';

const {width} = Dimensions.get('window');

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

const VoiceMessage = ({fromMe, message}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [sound, setSound] = useState(null);
  const [soundStatus, setSoundStatus] = useState({
    soundPosition: null,
    soundDuration: null,
    isPlaying: false,
    isPlaybackAllowed: false,
  });
  let {ipfsPath, time} = message;
  let uri = imageEnvironment + ipfsPath;

  const updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      setSoundStatus({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        isPlaying: status.isPlaying,
        isPlaybackAllowed: true,
      });
    } else {
      setSoundStatus({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const onSeekSliderSlidingComplete = async (value) => {
    if (sound != null) {
      const seekPosition = value * (soundStatus.soundDuration || 0);
      sound.playFromPositionAsync(seekPosition);
    }
  };

  const getSeekSliderPosition = () => {
    if (
      sound != null &&
      soundStatus.soundPosition != null &&
      soundStatus.soundDuration != null
    ) {
      return soundStatus.soundPosition / soundStatus.soundDuration;
    }
    return 0;
  };

  const getPlaybackTimestamp = () => {
    if (
      sound != null &&
      soundStatus.soundPosition != null &&
      soundStatus.soundDuration != null
    ) {
      return `${getMMSSFromMillis(
        soundStatus.soundPosition,
      )} / ${getMMSSFromMillis(soundStatus.soundDuration)}`;
    }
    return '';
  };

  const onPlayPausePressed = () => {
    if (sound != null) {
      if (soundStatus.isPlaying) {
        sound.pauseAsync();
      } else {
        if (soundStatus.soundPosition == soundStatus.soundDuration) {
          sound.playFromPositionAsync(0);
        } else {
          sound.playAsync();
        }
      }
    }
  };

  const onDownloadPressed = async () => {
    const fileUri = FileSystem.documentDirectory + time + '.m4a';
    let downloadObject = FileSystem.createDownloadResumable(uri, fileUri);
    let response = await downloadObject.downloadAsync();
    console.log(response);
  };

  async function loadSound() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    console.log('Loading Sound ' + uri);
    const {sound} = await Audio.Sound.createAsync(
      {uri},
      {},
      updateScreenForSoundStatus,
      false,
    );
    setSound(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  const renderPlayback = () => (
    <Block style={styles.container}>
      <TouchableOpacity
        onPress={() => onPlayPausePressed()}
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        style={styles.ButtonStyle}>
        {soundStatus.isPlaying ? (
          <FontAwesome
            name="pause"
            size={15}
            color={fromMe ? 'white' : '#333'}
          />
        ) : (
          <FontAwesome
            name="play"
            size={15}
            color={fromMe ? 'white' : '#333'}
          />
        )}
      </TouchableOpacity>
      <Block style={{flex: 1}}>
        <Slider
          thumbTintColor={fromMe ? '#fff' : '#333'}
          minimumTrackTintColor={'#fff'}
          value={getSeekSliderPosition()}
          onSlidingComplete={onSeekSliderSlidingComplete}></Slider>
        <Text
          style={[
            styles.playbackTimestamp,
            {color: fromMe ? '#fff' : '#333', fontWeight: 'bold'},
          ]}>
          {getPlaybackTimestamp()}
        </Text>
      </Block>
      <TouchableOpacity
        onPress={() => onDownloadPressed()}
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        style={styles.DownloadButtonStyle}>
        <MaterialCommunityIcons
          name="download"
          size={22}
          color={fromMe ? '#fff' : '#333'}
        />
      </TouchableOpacity>
    </Block>
  );

  return (
    <View>
      <View style={styles.placeholders}>
        {isLoading ? (
          <ActivityIndicator size="large" color={'#ccc'} />
        ) : hasError ? (
          <MaterialIcons name="volume-off" color={'#ccc'} size={30} />
        ) : null}
      </View>
      <View
        style={[
          COMMON_STYLES.message,
          fromMe ? COMMON_STYLES.sentMessage : COMMON_STYLES.recievedMessage,
        ]}>
        {renderPlayback()}
        <Text
          style={
            fromMe
              ? COMMON_STYLES.sentMessageTimestamp
              : COMMON_STYLES.recievedMessageTimestamp
          }>
          {moment(time).format('lll').toString()}
        </Text>
      </View>
    </View>
  );
};

export default VoiceMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ButtonStyle: {
    paddingRight: 10,
  },
  DownloadButtonStyle: {
    paddingLeft: 10,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  playbackTimestamp: {
    fontSize: 11,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#fff',
    width: width / 3 - 30,
  },
});
