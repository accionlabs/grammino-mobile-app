import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Block} from 'galio-framework';
import COMMON_STYLES from '../../../assets/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../AppHome/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../../../constants/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {EN, HIN, MAR} from '../../../constants/keys';
import {appOperations} from '../../../store/state/app';

const Language = ({navigation}) => {
  const language = useSelector((state) => state.app.lang);
  const dispatch = useDispatch();

  const changeLanguage = (langKey) => {
    if (language !== langKey) {
      dispatch(appOperations.changeLanguage(langKey));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={COMMON_STYLES.container}>
      <Block style={COMMON_STYLES.container}>
        <Header
          title="Choose a language"
          enableGoBack={true}
          showLanguageButton={false}
        />
        <TouchableOpacity
          style={styles.language}
          onPress={() => changeLanguage(EN)}>
          <Text style={styles.langText}>English</Text>
          {language === EN && (
            <FontAwesome
              name="check"
              size={20}
              style={styles.check}
              color={Theme.COLORS.SUCCESS}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.language}
          onPress={() => changeLanguage(MAR)}>
          <Text style={styles.langText}>मराठी</Text>
          {language === MAR && (
            <FontAwesome
              name="check"
              size={20}
              style={styles.check}
              color={Theme.COLORS.SUCCESS}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.language}
          onPress={() => changeLanguage(HIN)}>
          <Text style={styles.langText}>हिंदी</Text>
          {language === HIN && (
            <FontAwesome
              name="check"
              size={20}
              style={styles.check}
              color={Theme.COLORS.SUCCESS}
            />
          )}
        </TouchableOpacity>
      </Block>
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  language: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  langText: {
    fontFamily: 'Avenir Black',
    color: '#333',
  },
  check: {
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
