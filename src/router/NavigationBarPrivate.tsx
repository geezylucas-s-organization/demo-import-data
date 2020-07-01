import React, { Fragment } from "react";
import clsx from "clsx";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { RoutesPrivate, RouteType } from "./Routes";
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
  Button,
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
    title: {
      flexGrow: 1,
    },
  })
);

interface INavBarPrivateProps extends RouteComponentProps {
  open: boolean;
  setOpen: (active: boolean) => void;
}

const NavigationBarPrivate: React.FC<INavBarPrivateProps> = (
  props: INavBarPrivateProps
) => {
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
          <Typography variant="h6" className={classes.title}>
            Faccloud
          </Typography>
          <Button color="inherit">Cerrar sesión</Button>
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
          {RoutesPrivate.map((prop: RouteType, index: number) => (
            <ListItem
              component={Link}
              to={prop.path}
              key={index}
              selected={activeRoute(prop.path)}
            >
              <ListItemText primary={prop.sidebarName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  );
};

export default withRouter(NavigationBarPrivate);
