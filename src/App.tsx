import React from "react";
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { RoutesPrivate, RoutesPublic, RouteType } from "./router/Routes";
import NavigationBarPrivate from "./router/NavigationBarPrivate";
import NavigationBarPublic from "./router/NavigationBarPublic";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { connect, MapStateToProps } from "react-redux";
import { AppState } from "./store/rootReducer";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface IAppStateProps {
  isAuth: boolean;
}

const App: React.FC<IAppStateProps> = ({ isAuth }: IAppStateProps) => {
  const classes = useStyles();

  const PrivateRoute: React.FC<RouteProps> = ({
    component,
    ...rest
  }: RouteProps) => (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuth ? (
          <Route {...props} component={component} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );

  const PublicRoute: React.FC<RouteProps> = ({
    component,
    ...rest
  }: RouteProps) => (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        !isAuth ? (
          <Route {...props} component={component} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  if (!isAuth) {
    return (
      <div className={classes.root}>
        <NavigationBarPublic />
        <Switch>
          {RoutesPublic.map((route: RouteType) => (
            <Route exact path={route.path} key={route.path}>
              <main className={classes.content}>
                <Toolbar />
                <PublicRoute component={route.component} path={route.path} />
              </main>
            </Route>
          ))}
          {RoutesPrivate.map((route: RouteType, index: number) => (
            <PrivateRoute
              component={route.component}
              path={route.path}
              key={index}
            />
          ))}
        </Switch>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <NavigationBarPrivate />
      <Switch>
        {RoutesPrivate.map((route: RouteType) => (
          <Route exact path={route.path} key={route.path}>
            <main className={classes.content}>
              <Toolbar />
              <PrivateRoute component={route.component} path={route.path} />
            </main>
          </Route>
        ))}
        {RoutesPublic.map((route: RouteType, index: number) => (
          <PublicRoute
            component={route.component}
            path={route.path}
            key={index}
          />
        ))}
      </Switch>
    </div>
  );
};

const mapStateToProps: MapStateToProps<IAppStateProps, {}, AppState> = (
  state: AppState
): IAppStateProps => ({
  isAuth: state.user.isAuth,
});

export default connect<IAppStateProps, {}, {}, AppState>(
  mapStateToProps,
  {}
)(App);
