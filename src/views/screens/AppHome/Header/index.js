import React from 'react';
import {StyleSheet} from 'react-native';
import Theme from '../../../../constants/Theme';
import {Block, Text, Button} from 'galio-framework';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appOperations} from '../../../../store/state/app';
import {useDispatch, useSelector} from 'react-redux';
import * as Navigator from '../../../../navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COMMON_STYLES from '../../../../assets/styles';

const Header = ({title, enableGoBack, showLanguageButton = true}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.app.auth.isAuthenticated,
  );
  const handleLogout = () => {
    dispatch(appOperations.logout());
  };

  const handleBack = () => {
    console.log(Navigator.navigationRef.current.goBack());
  };
  return (
    <Block style={styles.header}>
      <Block style={{flexDirection: 'row', alignItems: 'center'}}>
        {enableGoBack && (
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
            <AntDesign
              name="arrowleft"
              color="white"
              size={15}
              style={{paddingTop: 20, paddingBottom: 20, paddingRight: 20}}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </Block>

      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {showLanguageButton && (
          <Button
            color="white"
            style={[COMMON_STYLES.langHeaderButton, COMMON_STYLES.shadow]}
            onPress={() => {
              Navigator.navigate('Language');
            }}>
            <Text style={COMMON_STYLES.langButtonText}>अ</Text>
          </Button>
        )}
        {isAuthenticated && (
          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="logout" size={20} color={Theme.COLORS.WHITE} />
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: 'Avenir Black',
    fontSize: 21,
    color: Theme.COLORS.WHITE,
  },
  optionsContainer: {
    zIndex: 10,
  },
});
