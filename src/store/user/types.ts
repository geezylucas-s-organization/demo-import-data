import { Action } from "redux";

export interface IUserDataPublic {
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

// Describing the shape of the users's slice of state
export interface IUser {
  token: string;
  dataPublic?: IUserDataPublic;
}

export interface IUsersCredentials {
  email: string;
  password: string;
}

export interface IUserState {
  readonly userData?: IUser;
  readonly isAuth: boolean;
  readonly error?: string;
}

// Describing the different ACTION NAMES available
export const LOGIN = "@@user/LOGIN";
export const LOGOUT = "@@user/LOGOUT";

export interface ILoginAction extends Action<typeof LOGIN> {
  type: typeof LOGIN;
  payload?: IUserState;
}

export interface ILogoutAction extends Action<typeof LOGOUT> {
  type: typeof LOGOUT;
}

export type UserActionTypes = ILoginAction;
