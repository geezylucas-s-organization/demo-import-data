import { combineReducers, Reducer, AnyAction, Dispatch } from "redux";
import { userReducer } from "./user/reducers";
import { ILogoutAction, LOGOUT, IUserState } from "./user/types";
import { ThunkAction } from "redux-thunk";
import { persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";

// The top-level state object
export interface AppState {
  user: IUserState;
}

export type AppThunk = ThunkAction<Promise<void>, AppState, null, AnyAction>;

export const logout = (): AppThunk => {
  return async (dispatch: Dispatch): Promise<void> => {
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

const combinedReducers: Reducer<AppState> = combineReducers<AppState>({
  user: userReducer,
});

export default persistReducer<AppState>(persistConfig, rootReducer);
