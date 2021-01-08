import * as types from './types';

//Global
export const dismissErrorModal = () => ({
  type: types.DISMISS_ERROR_MODAL,
});

export const showLoader = (message) => ({
  type: types.SHOW_LOADER,
  payload: message,
});

export const hideLoader = () => ({
  type: types.HIDE_LOADER,
});

export const validateSession = () => ({
  type: types.VALIDATE_SESSION,
});

//Login
export const login = (phone, password) => ({
  type: types.LOGIN,
  payload: {
    phone,
    password,
  },
});

export const loggingIn = () => ({
  type: types.LOGGING_IN,
});

export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailed = (data) => ({
  type: types.LOGIN_FAILED,
  payload: data,
});

//Registration
export const register = (name, phone, password) => ({
  type: types.REGISTER,
  payload: {
    name,
    phone,
    password,
  },
});

export const registering = () => ({
  type: types.REGISTERING,
});

export const registrationSuccess = (data) => ({
  type: types.REGISTRATION_SUCCESS,
  payload: data,
});

export const registrationFailed = (data) => ({
  type: types.REGISTRATION_FAILED,
  payload: data,
});

//Logout
export const logout = () => ({
  type: types.LOGOUT,
});

export const loggingOut = () => ({
  type: types.LOGGING_OUT,
});

export const handleNewPrivateMessage = (data) => ({
  type: types.HANDLE_NEW_PRIVATE_MESSAGE,
  payload: data,
});

export const handleNewPublicMessage = (data) => ({
  type: types.HANDLE_NEW_PUBLIC_MESSAGE,
  payload: data,
});

export const handleNewEntityMessage = (data) => ({
  type: types.HANDLE_NEW_ENTITY_MESSAGE,
  payload: data,
});

export const handleNewConversation = (data) => ({
  type: types.HANDLE_NEW_CONVERSATION,
  payload: data,
});

export const changeLanguage = (data) => ({
  type: types.CHANGE_LANGUAGE,
  payload: data,
});
