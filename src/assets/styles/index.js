import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../constants/Theme';
const {width, height} = Dimensions.get('window');

const COMMON_STYLES = StyleSheet.create({
  langButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    borderRadius: 30,
  },
  langHeaderButton: {
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  langButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    zIndex: 2,
    lineHeight: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width,
    height: height - Theme.SIZES.STATUS_BAR_HEIGHT,
  },
  chatContainer: {
    padding: 20,
  },
  message: {
    padding: 20,
    marginBottom: 5,
  },
  messageText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
  sentMessage: {
    backgroundColor: '#F04E58',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    minWidth: 200,
  },
  sentMessageText: {
    color: '#FFFFFF',
  },
  sentMessageTimestamp: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    width: 130,
    bottom: 0,
    right: 2,
    padding: 2,
    textAlign: 'right',
    color: '#fff',
    opacity: 0.8,
  },
  recievedMessage: {
    backgroundColor: '#EFF3F7',
    borderWidth: 1,
    borderColor: '#E9F1F9',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minWidth: 200,
  },
  recievedMessageText: {
    textAlign: 'left',
    color: '#2D2343',
  },
  recievedMessageTimestamp: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    width: 130,
    bottom: 0,
    right: 5,
    padding: 2,
    textAlign: 'right',
    color: '#1F212B',
    opacity: 0.8,
  },
  shadow: {
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default COMMON_STYLES;
