import React from 'react';
import {Block} from 'galio-framework';
import SearchBar from '../../../components/Search';
import PublicGroups from './PublicGroups';
import Conversations from './Conversations';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import Header from '../Header';
import {MESSAGE_FACTORY} from '../../../../constants/messages';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');

function Chats(props) {
  const language = useSelector((state) => state.app.lang);

  return (
    <Block flex style={styles.container}>
      <Header title={MESSAGE_FACTORY[language].messages} />
      <SearchBar />
      <Block flex center>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}>
          <PublicGroups />
          <Conversations />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    width: width,
    flex: 1,
  },
});

Chats.propTypes = {};

export default Chats;
