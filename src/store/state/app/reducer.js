import produce from 'immer';
import * as types from './types';
import {EN} from '../../../constants/keys';
import {
  LOGIN_MSG,
  LOGOUT_MSG,
  REGISTRATION_MSG,
} from '../../../constants/messages';

const initialState = {
  lang: EN,
  loader: {
    message: '',
    isVisible: false,
  },
  error: {
    message: '',
    isVisible: false,
  },
  auth: {
    phone: '',
    userId: '',
    token: '',
    isAuthenticated: false,
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //Global
      case types.LOGOUT: {
        draft.auth.isAuthenticated = false;
        draft.auth.phone = '';
        draft.auth.userId = '';
        draft.auth.token = '';
        draft.auth.name = '';
        break;
      }
      case types.LOGGING_OUT: {
        draft.loader.message = LOGOUT_MSG;
        draft.loader.isVisible = true;
        break;
      }
      case types.DISMISS_ERROR_MODAL: {
        draft.error.isVisible = false;
        draft.error.message = '';
        break;
      }
      case types.SHOW_LOADER: {
        draft.loader.message = action.payload;
        draft.loader.isVisible = true;
        break;
      }
      case types.HIDE_LOADER: {
        draft.loader.message = '';
        draft.loader.isVisible = false;
        break;
      }

      //Login
      case types.LOGGING_IN: {
        draft.loader.message = LOGIN_MSG;
        draft.loader.isVisible = true;
        break;
      }
      case types.LOGIN_SUCCESS: {
        const {
          token,
          data: {phone, name, userId},
        } = action.payload;
        draft.loader.message = '';
        draft.loader.isVisible = false;
        draft.auth.isAuthenticated = true;
        draft.auth.phone = phone;
        draft.auth.userId = userId;
        draft.auth.token = token;
        draft.auth.name = name;
        break;
      }
      case types.LOGIN_FAILED: {
        draft.loader.message = '';
        draft.loader.isVisible = false;
        draft.error.isVisible = true;
        draft.error.message = action.payload;
        break;
      }

      //Registration
      case types.REGISTERING: {
        draft.loader.isVisible = true;
        draft.loader.message = REGISTRATION_MSG;
        draft.error.isVisible = false;
        draft.error.message = '';
        break;
      }
      case types.REGISTRATION_SUCCESS: {
        draft.loader.isVisible = false;
        draft.loader.message = '';
        break;
      }
      case types.REGISTRATION_FAILED: {
        draft.loader.message = '';
        draft.loader.isVisible = false;
        draft.error.isVisible = true;
        draft.error.message = action.payload;
        break;
      }
      case types.CHANGE_LANGUAGE: {
        draft.lang = action.payload;
        break;
      }
      default:
        break;
    }
  });

export default appReducer;
