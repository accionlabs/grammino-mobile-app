import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Block, Text} from 'galio-framework';
import Theme from '../../../constants/Theme';
import moment from 'moment';
import * as Navigator from '../../../navigation';
import {MESSAGE_FACTORY} from '../../../constants/messages';
import {useSelector} from 'react-redux';

const Entity = ({entity: {_id: entityId, name, time}}) => {
  const language = useSelector((state) => state.app.lang);

  return (
    <TouchableOpacity
      onPress={() => {
        Navigator.navigate('EntityChat', {entityId, name});
      }}>
      <View style={styles.container}>
        <Block style={styles.thumbnail}>
          <FontAwesome name="video-camera" size={30} color="white" />
        </Block>
        <Block style={styles.wrapper} flex>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.status}>
              {MESSAGE_FACTORY[language].active}
            </Text>
          </Block>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.lastChat}>
              {MESSAGE_FACTORY[language].activation_date}{' '}
              {moment(time).format('DD MMM, YYYY')}
            </Text>
            {/* <Text style={styles.count}>8</Text> */}
          </Block>
        </Block>
      </View>
    </TouchableOpacity>
  );
};

export default Entity;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flex: 1,
  },
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  thumbnail: {
    height: 50,
    width: 50,
    backgroundColor: '#45B742',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#1EADF0',
    textAlign: 'center',
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
    color: '#1F212B',
  },
  status: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 14,
    color: '#45B742',
  },
  lastChat: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    color: '#4A4A4A',
  },
  count: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 14,
    width: 25,
    height: 25,
    textAlign: 'center',
    backgroundColor: '#F0901E',
    borderRadius: 20,
    lineHeight: 25,
    color: Theme.COLORS.WHITE,
  },
});
