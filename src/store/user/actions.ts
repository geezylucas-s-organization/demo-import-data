import axios, { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import {
  IUserState,
  LOGIN,
  ILoginAction,
  IUserData,
  IGetUserAction,
  GET_USER,
} from "./types";
import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { logout } from "../rootReducer";

interface IServerResponseLogin {
  data: string;
  message?: string;
  status: string;
}

interface IServerResponseGetUser {
  data: IUserData;
}

export const login: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<void>,
  // The type for the data within the last action
  IUserState,
  // The type of the parameter for the nested function
  {},
  // The type of the last action to be dispatched
  ILoginAction
>> = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let payload: IUserState = {
      isAuth: false,
      token: undefined,
      error: undefined,
      userData: undefined,
    };
    try {
      const response: AxiosResponse<IServerResponseLogin> = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email,
          password,
        }
      );
      if (response.data.status !== "error") {
        payload = {
          isAuth: true,
          token: response.data.data,
        };
      } else {
        payload = {
          isAuth: false,
          error: response.data.message,
        };
      }
    } catch (error) {
      payload = {
        isAuth: false,
        error: error,
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

export const getUser: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<void>,
  // The type for the data within the last action
  IUserState,
  // The type of the parameter for the nested function
  {},
  // The type of the last action to be dispatched
  IGetUserAction
>> = (token: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const response: AxiosResponse<IServerResponseGetUser> = await axios.get(
        "http://127.0.0.1:5000/api/users/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const getUserAction: IGetUserAction = {
        type: GET_USER,
        payload: response.data.data,
      };
      dispatch(getUserAction);
    } catch (error) {
      dispatch(logout());
    }
  };
};
