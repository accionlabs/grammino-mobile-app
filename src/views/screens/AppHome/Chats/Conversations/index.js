import {Block, Text} from 'galio-framework';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Conversation from '../../../../components/Conversation';
import {get} from 'lodash';
import {MESSAGE_FACTORY} from '../../../../../constants/messages';

const Conversations = () => {
  const conversations = useSelector((state) => state.conversations.private);
  const language = useSelector((state) => state.app.lang);

  return (
    <Block style={styles.container}>
      {conversations.isLoading ? (
        <Text>{MESSAGE_FACTORY[language].loading}</Text>
      ) : conversations.hasError ? (
        <Text>{conversations.errMsg}</Text>
      ) : conversations.data.length === 0 ? (
        <Text>{MESSAGE_FACTORY[language].no_conversations_yet}</Text>
      ) : (
        conversations.data.map((conversation, index) => {
          const profilePhoto = get(
            conversation,
            `recieverInfo.0.profilePhoto`,
            undefined,
          );
          return (
            <Conversation
              type="private"
              title={
                get(conversation, `recieverInfo.0.name`, undefined) || 'User'
              }
              thumbnail={profilePhoto}
              key={`conv-${index}`}
              conversation={conversation}
              count={get(conversations, `newCounts.${conversation._id}`, 0)}
            />
          );
        })
      )}
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
});

export default Conversations;
