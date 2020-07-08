import { combineReducers, Reducer, AnyAction, ActionCreator } from "redux";
import { userReducer } from "./user/reducers";
import { Dispatch } from "redux";
import { ILogoutAction, LOGOUT } from "./user/types";
import { ThunkAction } from "redux-thunk";
import { persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type AppState = ReturnType<typeof combinedReducers>;

export const logout: ActionCreator<ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
>> = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const logouAction: ILogoutAction = {
      type: LOGOUT,
    };
    dispatch(logouAction);
  };
};

const rootReducer: Reducer<AppState, AnyAction> = (
  state,
  action: AnyAction
): AppState => {
  switch (action.type) {
    case LOGOUT:
      return combinedReducers(undefined, action);
    default:
      return combinedReducers(state, action);
  }
};

const migrations = {};

const persistConfig = {
  key: "root",
  version: -1,
  storage,
  debug: true,
  blacklist: ["user"],
  migrate: createMigrate(migrations, { debug: true }),
};

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["error"],
};

const combinedReducers = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export default persistReducer(persistConfig, rootReducer);
