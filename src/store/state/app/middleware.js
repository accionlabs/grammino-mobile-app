import * as types from './types';
import {environment} from '../../../environment';
import * as appActions from './actions';
import {createLogic} from 'redux-logic';
import axios from 'axios';
import * as Navigator from '../../../navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {emitSocketJoinEvent} from '../../../services/socket';
import {conversationsOperations} from '../conversations';
import {entityOperations} from '../entity';

const loginLogic = createLogic({
  type: types.LOGIN,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(appActions.loggingIn());
    const {phone, password} = action.payload;
    axios
      .post(environment + 'login', {
        phone,
        password,
      })
      .then(async (res) => {
        console.log('Login Success', res);
        const {error, message} = res.data;
        if (error) {
          dispatch(appActions.loginFailed(message));
        } else {
          const {
            data: {name, phone, userId},
            token,
          } = res.data;

          dispatch(appActions.loginSuccess(res.data));
          console.log('Logged in:', res.data);
          await AsyncStorage.setItem('access', 'true');
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('phone', phone);
          await AsyncStorage.setItem('userName', name);
          Navigator.navigate('App');
        }
      })
      .catch((err) => {
        console.log('Login Failed', err);
        const {message} = err;
        dispatch(appActions.loginFailed(message || 'An error occured'));
      })
      .finally(() => {
        done();
      });
  },
});

const validateSessionLogic = createLogic({
  type: types.VALIDATE_SESSION,
  latest: true,
  async process({getState, action}, dispatch, done) {
    dispatch(appActions.showLoader('Checking for active session...'));
    const access = await AsyncStorage.getItem('access');
    if (access === 'true') {
      dispatch(appActions.showLoader('Restoring session...'));
      const phone = await AsyncStorage.getItem('phone');
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('userName');
      const userId = await AsyncStorage.getItem('userId');

      if (phone !== '' && token !== '' && userId !== '') {
        const userInfo = {
          token,
          data: {
            name,
            phone,
            userId,
          },
        };
        emitSocketJoinEvent(phone);
        //Delay of 1s
        setTimeout(() => {
          dispatch(appActions.loginSuccess(userInfo));
          Navigator.navigate('App');
          dispatch(appActions.hideLoader());
          done();
        }, 1000);
      } else {
        dispatch(appActions.hideLoader());
        done();
      }
    } else {
      dispatch(appActions.hideLoader());
      done();
    }
  },
});

const registrationLogic = createLogic({
  type: types.REGISTER,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(appActions.registering());
    const {name, phone, password} = action.payload;
    axios
      .post(environment + 'user', {
        name,
        phone,
        password,
      })
      .then((res) => {
        console.log('Registration Success', res);
        const {error, message} = res.data;
        if (error) {
          dispatch(appActions.registrationFailed(message));
        } else {
          dispatch(appActions.registrationSuccess(res.data));
          Navigator.navigate('Login');
        }
      })
      .catch((err) => {
        console.log('Registration Failed', err);
        const {message} = err;
        dispatch(appActions.registrationFailed(message || 'An error occured'));
      })
      .finally(() => {
        done();
      });
  },
});

const logoutLogic = createLogic({
  type: types.LOGOUT,
  latest: true,
  async process({getState, action}, dispatch, done) {
    dispatch(appActions.loggingOut());
    await AsyncStorage.setItem('access', 'false');
    await AsyncStorage.setItem('userId', '');
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('phone', '');
    await AsyncStorage.setItem('userName', '');
    await AsyncStorage.setItem('contactData', '');
    Navigator.navigate('Landing');
    dispatch(appActions.hideLoader());
    done();
  },
});

const handleNewPublicMessageLogic = createLogic({
  type: types.HANDLE_NEW_PUBLIC_MESSAGE,
  latest: true,
  async process({getState, action}, dispatch, done) {
    const {
      conversations: {
        public: {isViewing},
      },
    } = getState();
    const message = action.payload;
    dispatch(conversationsOperations.appendNewChatToPublic(message));
    if (!isViewing) {
      dispatch(conversationsOperations.incrementUnseenPublicChatCount());
    }
    done();
  },
});

const handleNewPrivateMessageLogic = createLogic({
  type: types.HANDLE_NEW_PRIVATE_MESSAGE,
  latest: true,
  async process({getState, action}, dispatch, done) {
    const {
      conversations: {
        active: {conversation: activeConversation},
      },
    } = getState();
    const message = action.payload;
    const {
      msg: {conversationId},
    } = message;

    if (
      activeConversation &&
      activeConversation._id &&
      conversationId === activeConversation._id
    ) {
      dispatch(conversationsOperations.appendNewChatToPrivate(action.payload));
    } else {
      dispatch(
        conversationsOperations.incrementUnseenPrivateChatCount(conversationId),
      );
    }

    done();
  },
});

const handleNewConversationLogic = createLogic({
  type: types.HANDLE_NEW_CONVERSATION,
  latest: true,
  async process({getState, action}, dispatch, done) {
    const message = action.payload;
    dispatch(conversationsOperations.loadConversations());
    done();
  },
});

const handleNewEntityMessageLogic = createLogic({
  type: types.HANDLE_NEW_ENTITY_MESSAGE,
  latest: true,
  async process({getState, action}, dispatch, done) {
    const message = action.payload;

    dispatch(entityOperations.appendNewChatToEntity(message));
    done();
  },
});

export default [
  loginLogic,
  registrationLogic,
  validateSessionLogic,
  logoutLogic,
  handleNewPublicMessageLogic,
  handleNewPrivateMessageLogic,
  handleNewEntityMessageLogic,
  handleNewConversationLogic,
];
