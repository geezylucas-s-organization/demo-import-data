import axios, { AxiosResponse } from "axios";
import { Dispatch, AnyAction } from "redux";
import {
  IUserState,
  IUser,
  LOGIN,
  ILoginAction,
  IUsersCredentials,
} from "./types";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

interface ServerResponseLogin {
  data?: IUser;
  message?: string;
  status: string;
}

export const login: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<void>,
  // The type for the data within the last action
  {},
  // The type of the parameter for the nested function
  {},
  // The type of the last action to be dispatched
  AnyAction
>> = ({ email, password }: IUsersCredentials) => {
  return async (dispatch: Dispatch): Promise<void> => {
    let payload: IUserState = {
      isAuth: false,
    };
    try {
      const response: AxiosResponse<ServerResponseLogin> = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email,
          password,
        }
      );
      if (response.data.status !== "error") {
        payload = {
          isAuth: true,
          error: undefined,
          userData: response.data.data,
        };
      } else {
        payload = {
          isAuth: false,
          error: response.data.message,
          userData: undefined,
        };
      }
    } catch (error) {
      payload = {
        isAuth: false,
        error: error,
        userData: undefined,
      };
    } finally {
      const loginAction: ILoginAction = {
        type: LOGIN,
        payload: payload,
      };
      dispatch(loginAction);
    }
  };
};
