import React, { Fragment } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { RoutesPrivate, RouteType } from "./Routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  CssBaseline,
  ListItemIcon,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { logout, AppState } from "../store/rootReducer";
import { AnyAction } from "redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface IDispatchProps {
  logoutAsync: () => Promise<void>;
}

interface IPropsOwn extends RouteComponentProps {}

type INavBarPrivateProps = IDispatchProps & IPropsOwn;

const NavigationBarPrivate: React.FC<INavBarPrivateProps> = ({
  location,
  logoutAsync,
}: INavBarPrivateProps) => {
  const classes = useStyles();

  const activeRoute = (routeName: string): boolean => {
    return location.pathname === routeName ? true : false;
  };

  const logout = async () => {
    try {
      await logoutAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Faccloud
          </Typography>
          <Button color="inherit" onClick={logout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {RoutesPrivate.map((prop: RouteType, index: number) => (
              <ListItem
                button
                component={Link}
                to={prop.path}
                key={index}
                selected={activeRoute(prop.path)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, AnyAction>
): IDispatchProps => {
  return {
    logoutAsync: () => dispatch(logout()),
  };
};

export default withRouter(
  connect<{}, IDispatchProps, {}>(
    null,
    mapDispatchToProps
  )(React.memo(NavigationBarPrivate))
);
