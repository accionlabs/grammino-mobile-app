import produce from 'immer';
import * as types from './types';

const initialState = {
  entities: {
    isLoading: false,
    hasError: false,
    errMsg: '',
    data: [],
  },
  conversation: {
    isLoading: false,
    hasError: false,
    errMsg: '',
    data: [],
  },
};

const entityReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOADING_ENTITIES: {
        draft.entities.isLoading = true;
        draft.entities.hasError = false;
        draft.entities.errMsg = '';
        break;
      }
      case types.LOAD_ENTITIES_SUCCESS: {
        draft.entities.isLoading = false;
        draft.entities.hasError = false;
        draft.entities.errMsg = '';
        draft.entities.data = action.payload;
        break;
      }
      case types.LOAD_ENTITIES_FAILED: {
        draft.entities.isLoading = false;
        draft.entities.hasError = true;
        draft.entities.errMsg = action.payload;
        break;
      }
      case types.LOADING_ENTITY_CONVERSATION: {
        draft.conversation.isLoading = true;
        draft.conversation.hasError = false;
        draft.conversation.errMsg = '';
        break;
      }
      case types.LOAD_ENTITY_CONVERSATION_SUCCESS: {
        draft.conversation.isLoading = false;
        draft.conversation.hasError = false;
        draft.conversation.errMsg = '';
        draft.conversation.data = action.payload;
        break;
      }
      case types.LOAD_ENTITY_CONVERSATION_FAILED: {
        draft.conversation.isLoading = true;
        draft.conversation.hasError = true;
        draft.conversation.errMsg = action.payload;
        break;
      }
      case types.SEND_COMMAND_SUCCESS: {
        draft.conversation.data = [...draft.conversation.data, action.payload];
        break;
      }
      case types.APPEND_NEW_CHAT_TO_ENTITY: {
        draft.conversation.data = [
          ...draft.conversation.data,
          action.payload.msg,
        ];
        break;
      }
      default:
        break;
    }
  });

export default entityReducer;
