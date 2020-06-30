// Describing the shape of the users's slice of state
export interface IUser {
  userId: string;
  token: string;
}

export interface IAccessCredentials {
  email: string;
  password: string;
}

export interface IUserState {
  readonly userData?: IUser;
  readonly isAuth: boolean;
  readonly errors?: any;
}

// Describing the different ACTION NAMES available
export const LOGIN = "@@user/LOGIN";
export const FETCH_ERROR = "@@user/FETCH_ERROR";

interface ILoginAction {
  type: typeof LOGIN;
  payload: IUser;
}

interface IFetchErrorAction {
  type: typeof FETCH_ERROR;
  payload: any;
}

export type UserActionTypes = ILoginAction | IFetchErrorAction;
