import { combineReducers, Reducer, AnyAction, ActionCreator } from "redux";
import { userReducer } from "./user/reducers";
import { ILogoutAction, LOGOUT } from "./user/types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";

export type AppState = ReturnType<typeof combinedReducers>;

export const logout: ActionCreator<ThunkAction<
  Promise<void>,
  {},
  {},
  ILogoutAction
>> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const logoutAction: ILogoutAction = {
      type: LOGOUT,
    };
    dispatch(logoutAction);
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

const saveSubsetFilter = createBlacklistFilter("user", ["error"]);

const migrations = {};

const persistConfig = {
  key: "root",
  version: -1,
  storage,
  whitelist: ["user"],
  transforms: [saveSubsetFilter],
  debug: true,
  migrate: createMigrate(migrations, { debug: true }),
};

const combinedReducers = combineReducers({
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
