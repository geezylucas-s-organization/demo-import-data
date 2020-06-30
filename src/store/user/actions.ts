import axios, { AxiosResponse } from "axios";
import { AppState } from "../index";
import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAccessCredentials, IUser, LOGIN, FETCH_ERROR } from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<void, AppState, null, Action<string>>
>;

interface ServerResponseLogin {
  data: IUser;
}

export const login: AppThunk = (user: IAccessCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: AxiosResponse<ServerResponseLogin> = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      dispatch({
        type: LOGIN,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: FETCH_ERROR,
        payload: error,
      });
    }
  };
};
