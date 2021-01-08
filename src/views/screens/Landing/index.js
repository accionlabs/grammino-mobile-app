import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import {LinearGradient} from 'expo-linear-gradient';
import materialTheme from '../../../constants/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import COMMON_STYLES from '../../../assets/styles';
import Theme from '../../../constants/Theme';
import {useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../constants/messages';
const {height, width} = Dimensions.get('window');

export default function LandingScreen(props) {
  const {navigation} = props;
  const language = useSelector((state) => state.app.lang);

  return (
    <SafeAreaView style={[COMMON_STYLES.container]}>
      <Block flex style={styles.container}>
        <Button
          color="white"
          style={[COMMON_STYLES.langButton, COMMON_STYLES.shadow]}
          onPress={() => {
            navigation.navigate('Language');
          }}>
          <Text style={COMMON_STYLES.langButtonText}>अ</Text>
        </Button>

        <ScrollView style={[COMMON_STYLES.container]}>
          <StatusBar barStyle="light-content" />
          <ImageBackground
            source={require('../../../assets/images/aatle-village.jpeg')}
            style={styles.imageBg}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
              style={styles.gradientContainer}
            />
            <Block flex space="around" style={styles.paddedContainer}>
              <Block flex style={styles.wrapper}>
                <Block>
                  <Block>
                    <Image
                      style={styles.logo}
                      source={require('../../../assets/images/graminno-app-logo.png')}
                      resizeMode="contain"
                    />
                  </Block>
                  <Block>
                    <Text
                      color="white"
                      size={width * 0.1}
                      style={styles.boldCaptions}>
                      {MESSAGE_FACTORY[language].welcome}
                    </Text>
                  </Block>
                  <Block row>
                    <Text
                      color="white"
                      size={width * 0.1}
                      style={styles.boldCaptions}>
                      {MESSAGE_FACTORY[language].aatle_gram_sevak}
                    </Text>
                  </Block>
                  <Text
                    size={width * 0.04}
                    color="white"
                    style={styles.tagline}>
                    {MESSAGE_FACTORY[language].tagline}
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    width: '100%',
                  }}>
                  <Button
                    shadowless
                    style={styles.button}
                    color={materialTheme.COLORS.WHITE}
                    onPress={() => navigation.navigate('Login')}>
                    <Text color="#33373C" style={styles.buttonText} size={17}>
                      {MESSAGE_FACTORY[language].login_using_phone}
                    </Text>
                  </Button>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </ScrollView>
      </Block>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageBg: {
    height: height - Theme.SIZES.STATUS_BAR_HEIGHT,
    width,
    zIndex: 1,
  },
  wrapper: {
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  logo: {
    height: width * 0.2,
    width: width * 0.2,
    marginBottom: width * 0.08,
  },
  container: {
    backgroundColor: 'black',
    height,
    width,
    position: 'relative',
    zIndex: 0,
  },
  paddedContainer: {
    paddingHorizontal: width * 0.055,
    bottom: width * 0.055,
    zIndex: 10,
    height,
    width,
  },
  button: {
    width: '100%',
    height: theme.SIZES.BASE * 4,
    shadowRadius: 0,
    shadowOpacity: 0,
    color: '#000',
    fontWeight: 'bold',
  },
  boldCaptions: {
    fontFamily: 'Avenir Black',
    lineHeight: width * 0.145,
  },
  tagline: {
    fontFamily: 'Avenir Black',
    lineHeight: width * 0.09,
    marginBottom: width * 0.1,
  },
  gradientContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
