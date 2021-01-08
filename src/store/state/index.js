import { combineReducers } from "redux";
import app from "./app";
import entity from "./entity";
import conversations from "./conversations";
import contacts from "./contacts";

const appReducer = combineReducers({
  app,
  conversations,
  entity,
  contacts,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
