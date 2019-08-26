import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import allReducer from "./Reducer";
import allSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState) {
  const middleware = [thunk, sagaMiddleware, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.devToolsExtension());
  }
  const rootReducer = combineReducers({
    allReducer,
    router: connectRouter(history)
  });

  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  sagaMiddleware.run(allSaga);

  return store;
}
