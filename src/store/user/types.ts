import { Action } from "redux";

// Describing the shape of the users's slice of state
export interface IUser {
  userId: {
    $oid: string;
  };
  token: string;
}

export interface IUsersCredentials {
  email: string;
  password: string;
}

export interface IUserState {
  readonly userData?: IUser;
  readonly isAuth: boolean;
}

// Describing the different ACTION NAMES available
export const LOGIN = "@@user/LOGIN";

export interface ILoginAction extends Action<typeof LOGIN> {
  type: typeof LOGIN;
  payload?: IUser;
}

export type UserActionTypes = ILoginAction;
