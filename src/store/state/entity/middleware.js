import * as types from "./types";
import { environment } from "../../../environment";
import * as entityActions from "./actions";
import { createLogic } from "redux-logic";
import axios from "axios";
import { setHeaders } from "../../../services/auth";

const loadEntitiesLogic = createLogic({
  type: types.LOAD_ENTITIES,
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch(entityActions.loadingEntities());
    const {
      app: {
        auth: { token },
      },
    } = getState();

    axios
      .get(environment + "api/entity", {
        headers: setHeaders({
          token: token,
        }),
      })
      .then((res) => {
        const { error, message } = res.data;
        if (error) {
          dispatch(entityActions.loadEntitiesFailed(message));
        } else {
          const { data } = res.data;
          dispatch(
            entityActions.loadEntitiesSuccess(
              data
              //   [
              //   //Mocked
              //   {
              //     entityId: "368243c7-b632-4973-875b-c3d7bf6468c0",
              //     command: "take_photo",
              //     action: "click_picture",
              //     type: "camera",
              //   },
              //   {
              //     entityId: "83807543-2d74-4e39-b198-67ed1f501a0c",
              //     command: "take_photo",
              //     action: "click_picture",
              //     type: "camera",
              //   },
              // ]
            )
          );
        }
      })
      .catch((err) => {
        console.log("entity err", err);
        dispatch(entityActions.loadEntitiesFailed("An error occured"));
      })
      .finally(() => {
        done();
      });
  },
});

const loadEntityConversationLogic = createLogic({
  type: types.LOAD_ENTITY_CONVERSATION,
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch(entityActions.loadingEntityConversation());
    const {
      app: {
        auth: { token, phone },
      },
    } = getState();
    const entityId = action.payload;

    axios
      .post(
        environment + "api/entity/communication/list",
        {
          entityId,
          phone,
        },
        {
          headers: setHeaders({
            token: token,
          }),
        }
      )
      .then((res) => {
        const { error, message } = res.data;
        if (error) {
          dispatch(entityActions.loadEntityConversationFailed(message));
        } else {
          const { data } = res.data;
          dispatch(entityActions.loadEntityConversationSuccess(data));
        }
      })
      .catch((err) => {
        console.log("entity err", err);
        dispatch(
          entityActions.loadEntityConversationFailed("An error occured")
        );
      })
      .finally(() => {
        done();
      });
  },
});

const sendCommandLogic = createLogic({
  type: types.SEND_COMMAND,
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch(entityActions.sendingCommand());
    const {
      app: {
        auth: { token, phone, name },
      },
    } = getState();
    const { actionKey, entityId } = action.payload;

    console.log("Payload", {
      entityId,
      phone,
      message: actionKey,
      userName: name,
      type: "text",
    });

    axios
      .post(
        environment + "api/entity/communication",
        {
          entityId,
          phone,
          message: actionKey,
          userName: name,
          type: "text",
        },
        {
          headers: setHeaders({
            token: token,
          }),
        }
      )
      .then((res) => {
        const { error, message } = res.data;
        if (error) {
          dispatch(entityActions.sendCommandFailed(message));
        } else {
          const { data } = res.data;
          dispatch(entityActions.sendCommandSuccess(data));
        }
      })
      .catch((err) => {
        console.log("entity err", err);
        dispatch(entityActions.sendCommandFailed("An error occured"));
      })
      .finally(() => {
        done();
      });
  },
});

export default [
  loadEntitiesLogic,
  loadEntityConversationLogic,
  sendCommandLogic,
];
