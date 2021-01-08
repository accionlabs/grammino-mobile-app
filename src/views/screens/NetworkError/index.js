import React from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text} from 'galio-framework';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../constants/messages';

function NetworkError(props) {
  const language = useSelector((state) => state.app.lang);

  return (
    <Block flex style={styles.profile}>
      <Block flex style={styles.iconContainer}>
        <Text h3 style={styles.message} color="white">
          {MESSAGE_FACTORY[language].oops}
        </Text>
        <MaterialCommunityIcons
          name="access-point-network-off"
          size={200}
          color="white"
          style={{padding: 50}}
        />
      </Block>
      <Block flex style={styles.messageContainer}>
        <Text style={styles.message} h6>
          {MESSAGE_FACTORY[language].not_connected}
        </Text>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: '#fff',
  },
  iconContainer: {
    backgroundColor: '#F04E58',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  message: {
    fontFamily: 'Avenir Black',
    textAlign: 'center',
    padding: 20,
  },
});

NetworkError.propTypes = {};

export default NetworkError;
