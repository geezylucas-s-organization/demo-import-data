import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import persistedReducer from "./rootReducer";

export default () => {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(ReduxThunk))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
