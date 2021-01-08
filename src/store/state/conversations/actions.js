import * as types from './types';

//Help Messages
export const loadPublicConversations = () => ({
  type: types.LOAD_PUBLIC_CONVERSATIONS,
});

export const loadingPublicConversations = () => ({
  type: types.LOADING_PUBLIC_CONVERSATIONS,
});

export const loadPublicConversationsSuccess = (data) => ({
  type: types.LOAD_PUBLIC_CONVERSATIONS_SUCCESS,
  payload: data,
});

export const loadPublicConversationsFailed = (data) => ({
  type: types.LOAD_PUBLIC_CONVERSATIONS_FAILED,
  payload: data,
});

//Conversations
export const loadConversations = () => ({
  type: types.LOAD_CONVERSATIONS,
});

export const loadingConversations = () => ({
  type: types.LOADING_CONVERSATIONS,
});

export const loadConversationsSuccess = (data) => ({
  type: types.LOAD_CONVERSATIONS_SUCCESS,
  payload: data,
});

export const loadConversationsFailed = (data) => ({
  type: types.LOAD_CONVERSATIONS_FAILED,
  payload: data,
});

//Conversation
export const loadConversation = (data) => ({
  type: types.LOAD_CONVERSATION,
  payload: data,
});

export const loadingConversation = () => ({
  type: types.LOADING_CONVERSATION,
});

export const loadConversationSuccess = (data) => ({
  type: types.LOAD_CONVERSATION_SUCCESS,
  payload: data,
});

export const loadConversationFailed = (data) => ({
  type: types.LOAD_CONVERSATION_FAILED,
  payload: data,
});

//Public post
export const postInPublic = (data, type) => ({
  type: types.POST_IN_PUBLIC,
  payload: {type, data},
});

export const postingInPublic = () => ({
  type: types.POSTING_IN_PUBLIC,
});

export const postInPublicSuccess = (data) => ({
  type: types.POST_IN_PUBLIC_SUCCESS,
  payload: data,
});

export const postInPublicFailed = (data) => ({
  type: types.POST_IN_PUBLIC_FAILED,
  payload: data,
});

export const appendNewChatToPublic = (data) => ({
  type: types.APPEND_NEW_CHAT_TO_PUBLIC,
  payload: data,
});

//Private
export const postInPrivate = (data, type) => ({
  type: types.POST_IN_PRIVATE,
  payload: {type, data},
});

export const postingInPrivate = () => ({
  type: types.POSTING_IN_PRIVATE,
});

export const postInPrivateSuccess = (data) => ({
  type: types.POST_IN_PRIVATE_SUCCESS,
  payload: data,
});

export const postInPrivateFailed = (data) => ({
  type: types.POST_IN_PRIVATE_FAILED,
  payload: data,
});

export const clearActiveChat = () => ({
  type: types.CLEAR_ACTIVE_CHAT,
});

export const startConversation = (data) => ({
  type: types.START_CONVERSATION,
  payload: data,
});

export const startingConversation = () => ({
  type: types.STARTING_CONVERSATION,
});

export const startConversationSuccess = (data) => ({
  type: types.START_CONVERSATION_SUCCESS,
  payload: data,
});

export const startConversationFailed = (data) => ({
  type: types.START_CONVERSATION_FAILED,
  payload: data,
});

export const setPublicScreenActive = () => ({
  type: types.SET_PUBLIC_SCREEN_ACTIVE,
});

export const resetPublicScreenActive = () => ({
  type: types.RESET_PUBLIC_SCREEN_ACTIVE,
});

export const incrementUnseenPublicChatCount = () => ({
  type: types.INCREMENT_UNSEEN_PUBLIC_CHAT_COUNT,
});

export const resetUnseenPublicChatCount = () => ({
  type: types.RESET_UNSEEN_PUBLIC_CHAT_COUNT,
});

export const incrementUnseenPrivateChatCount = (convId) => ({
  type: types.INCREMENT_UNSEEN_PRIVATE_CHAT_COUNT,
  payload: convId,
});

export const resetUnseenPrivateChatCount = (convId) => ({
  type: types.RESET_UNSEEN_PRIVATE_CHAT_COUNT,
  payload: convId,
});

export const appendNewChatToPrivate = (data) => ({
  type: types.APPEND_NEW_CHAT_TO_PRIVATE,
  payload: data,
});
