import React, { useState } from "react";
import clsx from "clsx";
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { RoutesPrivate, RoutesPublic, RouteType } from "./router/Routes";
import NavigationBarPrivate, {
  drawerWidth,
} from "./router/NavigationBarPrivate";
import NavigationBarPublic from "./router/NavigationBarPublic";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { connect, MapStateToProps } from "react-redux";
import { AppState } from "./store";
import { IUserState } from "./store/user/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contentPublic: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

interface IAppStateProps {
  user: IUserState;
}

const App: React.FC<IAppStateProps> = ({ user }: IAppStateProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const PrivateRoute: React.FC<RouteProps> = ({
    component,
    ...rest
  }: RouteProps) => (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        user.isAuth ? (
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
        !user.isAuth ? (
          <Route {...props} component={component} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  if (!user.isAuth) {
    return (
      <div className={classes.root}>
        <NavigationBarPublic />
        <Switch>
          {RoutesPublic.map((route: RouteType) => (
            <Route exact path={route.path} key={route.path}>
              <main className={classes.contentPublic}>
                <div className={classes.drawerHeader} />
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
      <NavigationBarPrivate open={open} setOpen={setOpen} />
      <Switch>
        {RoutesPrivate.map((route: RouteType) => (
          <Route exact path={route.path} key={route.path}>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
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
  user: state.user,
});

export default connect<IAppStateProps, {}, {}, AppState>(
  mapStateToProps,
  {}
)(App);
