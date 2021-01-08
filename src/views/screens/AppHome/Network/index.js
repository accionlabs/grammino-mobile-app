import React from 'react';
import {Block} from 'galio-framework';
import Sensors from './Sensors';
import Entities from './Entities';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import Header from '../Header';
import {useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../../constants/messages';
const {width} = Dimensions.get('screen');

function Network(props) {
  const language = useSelector((state) => state.app.lang);

  return (
    <Block flex style={styles.container}>
      <Header title={MESSAGE_FACTORY[language].sensor_updates} />
      <Block flex center>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}>
          {/* <Sensors /> */}
          <Entities />
        </ScrollView>
      </Block>
    </Block>
  );
}

Network.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    width: width,
    flex: 1,
  },
});

export default Network;
