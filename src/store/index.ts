import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";

import { chatReducer } from "./chat/reducers";
import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default () => {
  const store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)));

  return store;
};
