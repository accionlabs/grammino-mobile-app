import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Block, Text} from 'galio-framework';
// import { TouchableOpacity } from "react-native-gesture-handler";
import Theme from '../../../constants/Theme';
import * as Navigator from '../../../navigation';
import get from 'lodash/get';

const Conversation = ({type, title, thumbnail, conversation, count = 0}) => {
  return (
    <View style={styles.container}>
      <Block style={styles.thumbnail}>
        {type === 'public' && (
          <Block style={styles.badge}>
            <MaterialIcons name="group" size={15} color="#fff" />
          </Block>
        )}
        {type === 'public' ? (
          <MaterialCommunityIcons name="account-group" size={30} />
        ) : (
          <FontAwesome name="user" size={30} />
        )}
      </Block>
      <Block style={styles.wrapper} flex>
        <TouchableOpacity
          onPress={() => {
            if (type === 'public') Navigator.navigate('PublicChat');
            else if (type === 'private') {
              Navigator.navigate('Chat', {
                reciever: get(conversation, `recieverInfo.0`, {}),
              });
            }
          }}>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{title}</Text>
            {count ? <Text style={styles.count}>{count}</Text> : null}

            {/* <Text style={styles.lastTime}>12:10 PM</Text> */}
          </Block>
          <Block
            flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.lastChat}>
              {get(conversation, `recieverInfo.0.phone`, '')}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 15,
    alignContent: 'center',
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
    backgroundColor: Theme.COLORS.SUCCESS,
    borderRadius: 20,
    lineHeight: 25,
    color: Theme.COLORS.WHITE,
  },
});
