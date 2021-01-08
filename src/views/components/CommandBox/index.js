import {Block} from 'galio-framework';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ENTITY_ACTIONS} from '../../../config/entity';
import {entityOperations} from '../../../store/state/entity';
import {useDispatch, useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../constants/messages';

const CommandBox = ({entityId}) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.lang);

  const sendCommand = (actionKey) => {
    dispatch(entityOperations.sendCommand(entityId, actionKey));
  };

  return (
    <Block style={[styles.commandBox]}>
      <ScrollView horizontal={true}>
        {ENTITY_ACTIONS.map(({actionKey}, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                sendCommand(actionKey);
              }}
              key={`command-${index}`}>
              <View style={styles.command}>
                <Text style={{fontWeight: 'bold'}}>
                  {MESSAGE_FACTORY[language][actionKey] || actionKey}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Block>
  );
};

export default CommandBox;

const styles = StyleSheet.create({
  commandBox: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  command: {
    padding: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ddd',
    borderColor: '#fff',
  },
});
