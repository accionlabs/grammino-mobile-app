import {Block} from 'galio-framework';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Conversation from '../../../../components/Conversation';
import {useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../../../constants/messages';

const PublicGroups = () => {
  const language = useSelector((state) => state.app.lang);

  const unseenPublicMessageCount = useSelector(
    (state) => state.conversations.public.newMessageCount,
  );

  return (
    <Block style={styles.container}>
      <Text style={styles.title}>
        {MESSAGE_FACTORY[language].public_groups}
      </Text>
      <Block>
        <Conversation
          type="public"
          title={MESSAGE_FACTORY[language].public_group_name}
          count={unseenPublicMessageCount}
        />
      </Block>
      <Block flex style={styles.seperator} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
    color: '#1F212B',
    marginBottom: 10,
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
});

export default PublicGroups;
