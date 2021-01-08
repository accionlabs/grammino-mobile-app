import produce from 'immer';
import * as types from './types';
import {EN} from '../../../constants/keys';

const initialState = {
  public: {
    isLoading: false,
    hasError: false,
    errMsg: '',
    data: [],
    inQueue: [],
    newMessageCount: 0,
    isViewing: false,
  },
  private: {
    isLoading: false,
    hasError: false,
    errMsg: '',
    data: [],
    newCounts: {},
  },
  active: {
    isLoading: false,
    hasError: false,
    errMsg: '',
    conversation: null,
    data: [],
    isViewing: false,
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //Private
      case types.LOADING_CONVERSATIONS: {
        draft.private.isLoading = true;
        draft.private.hasError = false;
        draft.private.errMsg = '';
        break;
      }
      case types.LOAD_CONVERSATIONS_SUCCESS: {
        draft.private.isLoading = false;
        draft.private.hasError = false;
        draft.private.errMsg = '';
        draft.private.data = action.payload;
        break;
      }
      case types.LOAD_CONVERSATIONS_FAILED: {
        draft.private.isLoading = false;
        draft.private.hasError = true;
        draft.private.errMsg = action.payload;
        break;
      }

      //Public
      case types.LOADING_PUBLIC_CONVERSATIONS: {
        draft.public.isLoading = true;
        draft.public.hasError = false;
        draft.public.errMsg = '';
        break;
      }
      case types.LOAD_PUBLIC_CONVERSATIONS_SUCCESS: {
        draft.public.isLoading = false;
        draft.public.hasError = false;
        draft.public.errMsg = '';
        draft.public.data = action.payload;
        break;
      }
      case types.LOAD_PUBLIC_CONVERSATIONS_FAILED: {
        draft.public.isLoading = false;
        draft.public.hasError = true;
        draft.public.errMsg = action.payload;
        break;
      }

      //Active
      case types.LOAD_CONVERSATION: {
        draft.active.conversation = action.payload;
        break;
      }
      case types.LOADING_CONVERSATION: {
        draft.active.isLoading = true;
        draft.active.hasError = false;
        draft.active.errMsg = '';
        break;
      }
      case types.LOAD_CONVERSATION_SUCCESS: {
        draft.active.isLoading = false;
        draft.active.hasError = false;
        draft.active.errMsg = '';
        draft.active.data = action.payload;
        break;
      }
      case types.LOAD_CONVERSATION_FAILED: {
        draft.active.isLoading = false;
        draft.active.hasError = true;
        draft.active.errMsg = action.payload;
        draft.active.conversation = null;
        break;
      }

      //Public post
      case types.POST_IN_PUBLIC: {
        draft.public.inQueue = [
          ...draft.public.inQueue,
          action.payload.timestamp,
        ];
        break;
      }
      case types.POST_IN_PUBLIC_SUCCESS: {
        draft.public.data = [...draft.public.data, action.payload];
        break;
      }
      case types.POST_IN_PRIVATE_SUCCESS: {
        draft.active.data = [...draft.active.data, action.payload];
        break;
      }
      case types.CLEAR_ACTIVE_CHAT: {
        draft.active.conversation = null;
        draft.active.data = [];
        break;
      }
      //Start conversation
      case types.START_CONVERSATION_SUCCESS: {
        draft.active.conversation = action.payload;
        break;
      }

      case types.SET_PUBLIC_SCREEN_ACTIVE: {
        draft.public.isViewing = true;
        draft.public.newMessageCount = 0;
        break;
      }
      case types.RESET_PUBLIC_SCREEN_ACTIVE: {
        draft.public.isViewing = false;
        break;
      }
      case types.SET_PRIVATE_SCREEN_ACTIVE: {
        draft.active.isViewing = true;
        break;
      }

      case types.INCREMENT_UNSEEN_PUBLIC_CHAT_COUNT: {
        draft.public.newMessageCount = state.public.newMessageCount + 1;
        break;
      }
      case types.RESET_UNSEEN_PUBLIC_CHAT_COUNT: {
        draft.public.newMessageCount = 0;
        break;
      }
      case types.APPEND_NEW_CHAT_TO_PUBLIC: {
        draft.public.data = [...state.public.data, action.payload.msg];
        break;
      }
      case types.APPEND_NEW_CHAT_TO_PRIVATE: {
        draft.active.data = [...state.active.data, action.payload.msg];
        break;
      }
      case types.INCREMENT_UNSEEN_PRIVATE_CHAT_COUNT: {
        const convId = action.payload;
        const existingCount = state.private.newCounts[convId] || 0;
        draft.private.newCounts = {
          ...state.private.newCounts,
          [convId]: existingCount + 1,
        };
        break;
      }
      case types.RESET_UNSEEN_PRIVATE_CHAT_COUNT: {
        const convId = action.payload;
        draft.private.newCounts = {
          ...state.private.newCounts,
          [convId]: 0,
        };
        break;
      }
      default:
        break;
    }
  });

export default appReducer;
