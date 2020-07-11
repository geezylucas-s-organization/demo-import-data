import { Action } from "redux";

export interface IUserSingUp {
  name: string;
  lastname: string;
  email: string;
  rfc: string;
  password: string;
}

// Describing the shape of the users's slice of state
export interface IUserData {
  name: string;
  lastname: string;
  email: string;
  phonenumber: string;
  creationdate: {
    $date: Date;
  };
  satInfo: {
    rfc: string;
    settingsrfc: {
      timerequest: number;
    };
  };
}

export interface IUserState {
  readonly isAuth: boolean;
  readonly token?: string;
  readonly userData?: IUserData;
  readonly error?: string;
}

// Describing the different ACTION NAMES available
export const LOGIN = "@@user/LOGIN";
export const LOGOUT = "@@user/LOGOUT";
export const GET_USER = "@@user/GET_USER";

export interface ILoginAction extends Action<typeof LOGIN> {
  type: typeof LOGIN;
  payload?: IUserState;
}

export interface ILogoutAction extends Action<typeof LOGOUT> {
  type: typeof LOGOUT;
}

export interface IGetUserAction extends Action<typeof GET_USER> {
  type: typeof GET_USER;
  payload?: IUserData;
}

export type UserActionTypes = ILoginAction | IGetUserAction;
