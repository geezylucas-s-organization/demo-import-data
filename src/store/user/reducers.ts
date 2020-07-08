import { Reducer } from "redux";
import { IUserState, UserActionTypes, LOGIN } from "./types";

const initialState: IUserState = {
  isAuth: false,
  userData: undefined,
  error: undefined,
};

export const userReducer: Reducer<IUserState, UserActionTypes> = (
  state = initialState,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
