import { Reducer } from "redux";
import { IUserState, UserActionTypes, LOGIN, GET_USER } from "./types";

const initialState: IUserState = {
  isAuth: false,
  token: undefined,
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
    case GET_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
