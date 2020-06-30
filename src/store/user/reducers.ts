import { Reducer } from "redux";
import { IUserState, UserActionTypes, LOGIN, FETCH_ERROR } from "./types";

const initialState: IUserState = {
  isAuth: false,
  userData: undefined,
  errors: undefined,
};

export const userReducer: Reducer<IUserState, UserActionTypes> = (
  state = initialState,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload, isAuth: true };
    case FETCH_ERROR: {
      return { ...state, errors: action.payload };
    }
    default:
      return state;
  }
};
