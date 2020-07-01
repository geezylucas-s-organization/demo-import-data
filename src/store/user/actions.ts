import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { IUser, LOGIN, ILoginAction, IUsersCredentials } from "./types";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

interface ServerResponseLogin {
  data: IUser;
}

export const login: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<ILoginAction>,
  // The type for the data within the last action
  IUser,
  // The type of the parameter for the nested function
  IUsersCredentials,
  // The type of the last action to be dispatched
  ILoginAction
>> = ({ email, password }: IUsersCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: AxiosResponse<ServerResponseLogin> = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const loginAction: ILoginAction = {
        type: LOGIN,
        payload: response.data.data,
      };
      return dispatch(loginAction);
    } catch (error) {
      console.log(error);
      const loginAction: ILoginAction = {
        type: LOGIN,
        payload: undefined,
      };
      return dispatch(loginAction);
    }
  };
};
