import React, {useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {requestVideoStoragePermission} from '../../../../utils/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const VideoModal = ({visible, videoPath, setVisibility}) => {
  const [state, setState] = useState({
    currentTime: 0,
    duration: 0,
    isFullScreen: true,
    isLoading: true,
    paused: false,
    playerState: PLAYER_STATES.PLAYING,
    screenType: 'content',
  });
  const videoPlayerRef = useRef(null);

  async function downloadVideo() {
    await requestVideoStoragePermission(videoPath);
  }

  const onEnd = () => {
    setState({
      ...state,
      playerState: PLAYER_STATES.ENDED,
    });
  };

  const onLoad = (data) => {
    setState({
      ...state,
      duration: data.duration,
      isLoading: false,
    });
  };

  const onLoadStart = () => {
    setState({
      ...state,
      isLoading: true,
    });
  };

  const onProgress = (data) => {
    const {isLoading, playerState} = state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setState({...state, currentTime: data.currentTime});
    }
  };

  // const onFullScreen = () => {
  //   if (state.screenType == "content")
  //     setState({ ...state, screenType: "cover" });
  //   else setState({ ...state, screenType: "content" });
  // };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setState({
      ...state,
      paused: !state.paused,
      playerState,
    });
  };

  const onReplay = () => {
    //Handler for Replay
    setState({...state, playerState: PLAYER_STATES.PLAYING});
    videoPlayerRef.current.seek(0);
  };

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayerRef.current.seek(seek);
  };

  const onSeeking = (currentTime) => setState({...state, currentTime});

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={state.paused}
          ref={videoPlayerRef}
          resizeMode="contain"
          onFullScreen={state.isFullScreen}
          source={{uri: videoPath}}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={state.duration}
          isLoading={state.isLoading}
          mainColor={'transparent'}
          // onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={state.playerState}
          progress={state.currentTime}>
          <MediaControls.Toolbar>
            <View style={styles.toolbarContainer}>
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
                    downloadVideo();
                  }}>
                  <FontAwesome5 name="download" color="white" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </MediaControls.Toolbar>
        </MediaControls>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  toolbarContainer: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default VideoModal;
