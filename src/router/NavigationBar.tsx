import React, { Fragment } from "react";
import clsx from "clsx";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Routes, RouteType } from "./Routes";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
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

interface IProps extends RouteComponentProps {
  open: boolean;
  setOpen: (active: boolean) => void;
}

const NavigationBar: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const handleDrawerOpen = (): void => {
    props.setOpen(true);
  };

  const handleDrawerClose = (): void => {
    props.setOpen(false);
  };

  const activeRoute = (routeName: string): boolean => {
    return props.location.pathname === routeName ? true : false;
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Faccloud
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Routes.map((prop: RouteType, key: number) => {
            return (
              <NavLink
                to={prop.path}
                style={{ textDecoration: "none" }}
                key={key}
              >
                <ListItem selected={activeRoute(prop.path)}>
                  <ListItemText primary={prop.sidebarName} />
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </Drawer>
    </Fragment>
  );
};

export default withRouter(NavigationBar);
