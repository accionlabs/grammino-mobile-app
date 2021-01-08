import React, {useState} from 'react';
import {Block, Button, Text, Input} from 'galio-framework';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import materialTheme from '../../../constants/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {appOperations} from '../../../store/state/app';
import {validateSpace} from '../../../utils';
import COMMON_STYLES from '../../../assets/styles';
import Theme from '../../../constants/Theme';
import {MESSAGE_FACTORY} from '../../../constants/messages';

const {height, width} = Dimensions.get('window');

function RegistrationScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.lang);

  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');
  let [confirmedPassword, setConfirmedPassword] = useState('');

  const validate = () => {
    console.log('VALIDATE', phone, password);
    if (phone === '') {
      Alert.alert(MESSAGE_FACTORY[language].phone_no_not_blank);
    } else if (password === '') {
      Alert.alert(MESSAGE_FACTORY[language].password_not_blank);
    } else if (!validateSpace(phone)) {
      Alert.alert(MESSAGE_FACTORY[language].invalid_mobile_number);
    } else if (!validateSpace(password)) {
      Alert.alert(MESSAGE_FACTORY[language].password_no_space);
    } else if (phone.length !== 10) {
      Alert.alert(MESSAGE_FACTORY[language].invalid_mobile_number);
    } else if (password !== confirmedPassword) {
      Alert.alert(MESSAGE_FACTORY[language].password_no_match);
    } else if (name === '') {
      Alert.alert(MESSAGE_FACTORY[language].please_enter_name);
    } else {
      dispatch(appOperations.register(name, phone, password));
    }
  };

  return (
    <SafeAreaView style={[COMMON_STYLES.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={COMMON_STYLES.container}>
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
                    <Block center>
                      <Image
                        style={styles.logo}
                        source={require('../../../assets/images/graminno-app-logo.png')}
                        resizeMode="contain"
                      />
                    </Block>
                    <Block>
                      <Text color="white" size={15} style={styles.boldCaptions}>
                        {MESSAGE_FACTORY[language].name}
                      </Text>
                      <Input
                        left
                        placeholder={MESSAGE_FACTORY[language].enter_name}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.input}
                        value={name}
                        onChangeText={(e) => {
                          setName(e);
                        }}
                        color="#000"
                        iconContent={
                          <FontAwesome
                            name="user-circle"
                            size={20}
                            color="black"
                            style={{marginRight: 10}}
                          />
                        }
                      />
                    </Block>
                    <Block>
                      <Text color="white" size={15} style={styles.boldCaptions}>
                        {MESSAGE_FACTORY[language].phone_number}
                      </Text>
                      <Input
                        type="phone-pad"
                        left
                        placeholder={
                          MESSAGE_FACTORY[language].enter_your_phone_number
                        }
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.input}
                        value={phone}
                        onChangeText={(e) => {
                          setPhone(e);
                        }}
                        color="#000"
                        iconContent={
                          <FontAwesome
                            name="user-circle"
                            size={20}
                            color="black"
                            style={{marginRight: 10}}
                          />
                        }
                      />
                    </Block>
                    <Block>
                      <Text color="white" size={15} style={styles.boldCaptions}>
                        {MESSAGE_FACTORY[language].password}
                      </Text>
                      <Input
                        value={password}
                        onChangeText={(e) => {
                          setPassword(e);
                        }}
                        viewPass
                        password
                        left
                        color="#000"
                        placeholder={
                          MESSAGE_FACTORY[language].type_your_password
                        }
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.input}
                        iconContent={
                          <FontAwesome
                            name="key"
                            size={20}
                            color="black"
                            style={{marginRight: 8}}
                          />
                        }
                      />
                    </Block>
                    <Block>
                      <Text color="white" size={15} style={styles.boldCaptions}>
                        {MESSAGE_FACTORY[language].confirm_password}
                      </Text>
                      <Input
                        value={confirmedPassword}
                        onChangeText={(e) => {
                          setConfirmedPassword(e);
                        }}
                        viewPass
                        password
                        left
                        color="#000"
                        placeholder={MESSAGE_FACTORY[language].reenter_password}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.input}
                        iconContent={
                          <FontAwesome
                            name="key"
                            size={20}
                            color="black"
                            style={{marginRight: 8}}
                          />
                        }
                      />
                    </Block>
                    <Block center>
                      <Button
                        shadowless
                        style={styles.button}
                        color={materialTheme.COLORS.WHITE}
                        onPress={() => validate()}>
                        <Text
                          color="#33373C"
                          style={styles.buttonText}
                          size={width * 0.04}>
                          {MESSAGE_FACTORY[language].register}
                        </Text>
                      </Button>
                      <Block row center>
                        <Text
                          color="#ccc"
                          size={width * 0.04}
                          style={{...styles.boldCaptions, marginRight: 5}}>
                          {MESSAGE_FACTORY[language].already_member}
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Login')}>
                          <Text
                            color="white"
                            size={width * 0.04}
                            style={styles.boldCaptions}>
                            {MESSAGE_FACTORY[language].login}
                          </Text>
                        </TouchableOpacity>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </ScrollView>
        </Block>
      </KeyboardAvoidingView>
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
    paddingBottom: 50,
    zIndex: 10,
    height,
    width,
  },
  button: {
    height: 50,
    shadowRadius: 0,
    shadowOpacity: 0,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boldCaptions: {
    fontFamily: 'Avenir Black',
    lineHeight: width * 0.06,
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
  input: {
    borderRadius: 5,
    borderColor: materialTheme.COLORS.INPUT,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    fontFamily: 'Avenir Black',
  },
});

export default RegistrationScreen;
