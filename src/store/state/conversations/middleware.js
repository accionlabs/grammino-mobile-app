import * as types from './types';
import {environment} from '../../../environment';
import * as conversationsActions from './actions';
import {createLogic} from 'redux-logic';
import axios from 'axios';
import {setHeaders, setHeaders2} from '../../../services/auth';
import isEmpty from 'lodash/isEmpty';

const loadConversationsLogic = createLogic({
  type: types.LOAD_CONVERSATIONS,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.loadingConversations());
    const {
      app: {
        auth: {token},
      },
    } = getState();

    axios
      .get(environment + 'api/conversation/recent', {
        headers: setHeaders({
          token: token,
        }),
      })
      .then((res) => {
        const {error, message} = res.data;
        if (error) {
          dispatch(conversationsActions.loadConversationsFailed(message));
        } else {
          const {data} = res.data;
          dispatch(conversationsActions.loadConversationsSuccess(data));
        }
      })
      .catch((err) => {
        console.log('conv err', err);
        dispatch(conversationsActions.loadConversationsFailed());
      })
      .finally(() => {
        done();
      });
  },
});

const loadPublicConversationsLogic = createLogic({
  type: types.LOAD_PUBLIC_CONVERSATIONS,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.loadingPublicConversations());
    const {
      app: {
        auth: {token},
      },
    } = getState();

    axios
      .get(environment + 'api/network/data', {
        headers: setHeaders({
          token: token,
        }),
      })
      .then((res) => {
        const {error, message} = res.data;
        if (error) {
          dispatch(conversationsActions.loadPublicConversationsFailed(message));
        } else {
          const {
            data: {data},
          } = res.data;
          dispatch(conversationsActions.loadPublicConversationsSuccess(data));
        }
      })
      .catch((err) => {
        dispatch(conversationsActions.loadPublicConversationsFailed());
      })
      .finally(() => {
        done();
      });
  },
});

const loadConversationLogic = createLogic({
  type: types.LOAD_CONVERSATION,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.loadingConversation());
    const {
      app: {
        auth: {token},
      },
    } = getState();
    const conversationId = action.payload._id;

    axios
      .post(
        environment + 'api/chat/recent',
        {
          conversationId: conversationId,
        },
        {
          headers: setHeaders({
            token: token,
          }),
        },
      )
      .then((res) => {
        const {error, message} = res.data;
        if (error) {
          dispatch(conversationsActions.loadConversationFailed(message));
        } else {
          const {data} = res.data;
          dispatch(conversationsActions.loadConversationSuccess(data));
        }
      })
      .catch((err) => {
        dispatch(conversationsActions.loadConversationFailed());
      })
      .finally(() => {
        done();
      });
  },
});

const postInPublicLogic = createLogic({
  type: types.POST_IN_PUBLIC,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.postingInPublic());
    const {
      app: {
        auth: {token, phone: sender},
      },
    } = getState();

    const type = action.payload.type;
    let payload;

    if (type === 'text') {
      payload = {
        ...action.payload.data,
        sender,
        type,
      };
      console.log('Public Payload::', payload);
    } else if (type === 'image' || type === 'video' || type === 'audio') {
      payload = new FormData();
      payload.append('conversationId', action.payload.data.conversationId);
      payload.append('sender', sender);
      payload.append('reciever', action.payload.data.reciever);
      payload.append('type', type);
      payload.append('userPhoto', {
        uri: action.payload.data.file.uri,
        name: action.payload.data.file.fileName,
        type:
          type === 'image'
            ? 'image/jpg'
            : type === 'video'
            ? 'video/mp4'
            : 'audio/m4a',
      });
    }

    if (!isEmpty(payload)) {
      axios
        .post(environment + 'network/message', payload, {
          headers:
            type === 'text'
              ? setHeaders({
                  token,
                })
              : setHeaders2({
                  token,
                }),
        })
        .then((res) => {
          console.log('post in public res', res.data);
          const {error, message} = res.data;
          if (error) {
            dispatch(conversationsActions.postInPublicFailed(message));
          } else {
            const {data} = res.data;
            dispatch(conversationsActions.postInPublicSuccess(data));
          }
        })
        .catch((err) => {
          console.log('post in public err', err);
          dispatch(conversationsActions.postInPublicFailed());
        })
        .finally(() => {
          done();
        });
    } else {
      dispatch(conversationsActions.postInPublicFailed());
      done();
    }
  },
});

const postInPrivateLogic = createLogic({
  type: types.POST_IN_PRIVATE,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.postingInPrivate());
    const {
      app: {
        auth: {token, phone: sender},
      },
    } = getState();
    //ok

    const type = action.payload.type;
    let payload;

    if (type === 'text') {
      payload = {
        ...action.payload.data,
        sender,
        type,
      };
    } else if (type === 'image' || type === 'video' || type === 'audio') {
      payload = new FormData();
      payload.append('conversationId', action.payload.data.conversationId);
      payload.append('sender', sender);
      payload.append('reciever', action.payload.data.reciever);
      payload.append('type', type);
      payload.append('userPhoto', {
        uri: action.payload.data.file.uri,
        name: action.payload.data.file.fileName,
        type:
          type === 'image'
            ? 'image/jpg'
            : type === 'video'
            ? 'video/mp4'
            : 'audio/m4a',
      });
    }

    if (!isEmpty(payload)) {
      axios
        .post(environment + 'api/chat', payload, {
          headers:
            type === 'text'
              ? setHeaders({
                  token,
                })
              : setHeaders2({
                  token,
                }),
        })
        .then((res) => {
          const {error, message} = res.data;
          if (error) {
            dispatch(conversationsActions.postInPrivateFailed(message));
          } else {
            const {data} = res.data;
            dispatch(conversationsActions.postInPrivateSuccess(data));
          }
        })
        .catch((err) => {
          dispatch(conversationsActions.postInPrivateFailed());
        })
        .finally(() => {
          done();
        });
    } else {
      dispatch(conversationsActions.postInPrivateFailed());
      done();
    }
  },
});

const startConversationLogic = createLogic({
  type: types.START_CONVERSATION,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(conversationsActions.startingConversation());
    const {
      app: {
        auth: {token},
      },
    } = getState();
    const recieverPhone = action.payload;

    if (!isEmpty(recieverPhone)) {
      axios
        .post(
          environment + 'api/conversation',
          {
            reciever: recieverPhone,
          },
          {
            headers: setHeaders({
              token,
            }),
          },
        )
        .then((res) => {
          const {error, message} = res.data;
          if (error) {
            dispatch(conversationsActions.startConversationFailed(message));
          } else {
            const {data} = res.data;
            dispatch(conversationsActions.startConversationSuccess(data[0]));
          }
        })
        .catch((err) => {
          dispatch(conversationsActions.startConversationFailed());
        })
        .finally(() => {
          done();
        });
    } else {
      dispatch(conversationsActions.startConversationFailed());
      done();
    }
  },
});

export default [
  loadConversationsLogic,
  loadPublicConversationsLogic,
  loadConversationLogic,
  postInPublicLogic,
  postInPrivateLogic,
  startConversationLogic,
];
