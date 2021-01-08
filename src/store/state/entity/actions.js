import * as types from './types';

//Entities
export const loadEntities = () => ({
  type: types.LOAD_ENTITIES,
});

export const loadingEntities = () => ({
  type: types.LOADING_ENTITIES,
});

export const loadEntitiesSuccess = (data) => ({
  type: types.LOAD_ENTITIES_SUCCESS,
  payload: data,
});

export const loadEntitiesFailed = (data) => ({
  type: types.LOAD_ENTITIES_FAILED,
  payload: data,
});

//Entity conversation
export const loadEntityConversation = (data) => ({
  type: types.LOAD_ENTITY_CONVERSATION,
  payload: data,
});

export const loadingEntityConversation = () => ({
  type: types.LOADING_ENTITY_CONVERSATION,
});

export const loadEntityConversationSuccess = (data) => ({
  type: types.LOAD_ENTITY_CONVERSATION_SUCCESS,
  payload: data,
});

export const loadEntityConversationFailed = (data) => ({
  type: types.LOAD_ENTITY_CONVERSATION_FAILED,
  payload: data,
});

export const clearEntityConversation = () => ({
  type: types.CLEAR_ENTITY_CONVERSATION,
});

//Commands
export const sendCommand = (entityId, actionKey) => ({
  type: types.SEND_COMMAND,
  payload: {
    entityId,
    actionKey,
  },
});

export const sendingCommand = () => ({
  type: types.SENDING_COMMAND,
});

export const sendCommandSuccess = (data) => ({
  type: types.SEND_COMMAND_SUCCESS,
  payload: data,
});

export const sendCommandFailed = (data) => ({
  type: types.SEND_COMMAND_FAILED,
  payload: data,
});

export const appendNewChatToEntity = (data) => ({
  type: types.APPEND_NEW_CHAT_TO_ENTITY,
  payload: data,
});
