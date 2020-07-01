import { Reducer } from "redux";
import { IUserState, UserActionTypes, LOGIN } from "./types";

const initialState: IUserState = {
  isAuth: false,
  userData: undefined,
};

export const userReducer: Reducer<IUserState, UserActionTypes> = (
  state = initialState,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case LOGIN:
      if (action.payload !== undefined) {
        return { ...action.payload, isAuth: true };
      } else {
        return { isAuth: false };
      }
    default:
      return state;
  }
};
