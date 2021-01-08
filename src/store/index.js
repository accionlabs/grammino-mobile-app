import {default as rootLogic} from './middleware';
import {createLogicMiddleware} from 'redux-logic';
import rootReducer from './state';
import {createStore, applyMiddleware, compose} from 'redux';

export var store = null;

export default function configureStore() {
  //prepare middleware to ensure redux can use it.
  const logicMiddleware = createLogicMiddleware(rootLogic);

  const composeMiddleware = compose(
    applyMiddleware(logicMiddleware),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__
      ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
      : []),
  );
  store = createStore(rootReducer, {}, composeMiddleware);
  console.log('Store configured!');
  return store;
}
