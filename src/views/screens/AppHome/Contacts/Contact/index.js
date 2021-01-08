import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Block, Text} from 'galio-framework';
import * as Navigator from '../../../../../navigation';
import get from 'lodash/get';
import Theme from '../../../../../constants/Theme';

const Contact = ({contact}) => {
  return (
    <View style={styles.container}>
      <Block style={styles.thumbnail}>
        <FontAwesome name="user" size={30} />
      </Block>
      <Block style={styles.wrapper} flex>
        <TouchableOpacity
          onPress={() => {
            Navigator.navigate('Chat', {reciever: contact});
          }}>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{contact.name}</Text>
            {/* <Text style={styles.lastTime}>12:10 PM</Text> */}
          </Block>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.lastChat}>{get(contact, `phone`, '')}</Text>
            {/* <Text style={styles.count}>8</Text> */}
          </Block>
        </TouchableOpacity>
      </Block>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  thumbnail: {
    height: 50,
    width: 50,
    backgroundColor: '#ddd',
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
  lastTime: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 14,
    color: '#4A4A4A',
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
