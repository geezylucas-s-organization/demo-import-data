import React, { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { IGetUserAction, IUserState } from "../../store/user/types";
import { getUser } from "../../store/user/actions";
import { AppState } from "../../store/rootReducer";
import { connect, MapStateToProps } from "react-redux";
import { Container } from "@material-ui/core";

interface IDispatchProps {
  getUserAsync: (token: string) => Promise<void>;
}

interface IStateProps {
  token: string;
}

type IHomeProps = IDispatchProps & IStateProps;

const HomeScreen: React.FC<IHomeProps> = ({
  getUserAsync,
  token,
}: IHomeProps) => {
  useEffect(() => {
    getUserAsync(token);
  }, [getUserAsync, token]);

  return (
    <Container>
      <h1>Inicio</h1>
    </Container>
  );
};

const mapStateToProps: MapStateToProps<IStateProps, {}, AppState> = (
  state: AppState
): IStateProps => ({
  token: state.user.token!,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IUserState, {}, IGetUserAction>
): IDispatchProps => {
  return {
    getUserAsync: (token: string) => dispatch(getUser(token)),
  };
};

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(HomeScreen));
