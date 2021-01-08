import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useMountEffect} from '../../../../../utils/hooks';
import Entity from '../../../../components/Entity';
import {Block} from 'galio-framework';
import {MESSAGE_FACTORY} from '../../../../../constants/messages';

const Entities = () => {
  const entities = useSelector((state) => state.entity.entities);
  const language = useSelector((state) => state.app.lang);

  return (
    <Block style={styles.container}>
      <Text style={styles.title}>
        {MESSAGE_FACTORY[language].sensor_updates}
      </Text>

      {entities.isLoading ? (
        <Text>{MESSAGE_FACTORY[language].loading}</Text>
      ) : entities.hasError ? (
        <Text>{entities.errMsg}</Text>
      ) : entities.data.length === 0 ? (
        <Text>{MESSAGE_FACTORY[language].no_entities_found}</Text>
      ) : (
        entities.data.map((entity, index) => (
          <Entity entity={entity} key={`entity-${index}`} />
        ))
      )}
    </Block>
  );
};

export default Entities;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
    color: '#1F212B',
    marginBottom: 5,
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
});
