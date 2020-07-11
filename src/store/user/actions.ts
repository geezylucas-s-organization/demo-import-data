import axios, { AxiosResponse } from "axios";
import { AnyAction, Dispatch } from "redux";
import {
  IUserState,
  LOGIN,
  ILoginAction,
  IUserData,
  IGetUserAction,
  GET_USER,
} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { logout, AppThunk, AppState } from "../rootReducer";

interface IServerResponseLogin {
  data: string;
  message?: string;
  status: string;
}

interface IServerResponseGetUser {
  data: IUserData;
}

export const login = (email: string, password: string): AppThunk => {
  return async (dispatch: Dispatch): Promise<void> => {
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

export const getUser = (token: string): AppThunk => {
  return async (
    dispatch: ThunkDispatch<AppState, null, AnyAction>
  ): Promise<void> => {
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
