import React, { useState } from "react";
import clsx from "clsx";
import { Switch, Route } from "react-router-dom";
import { Routes, RouteType } from "./router/Routes";
import NavigationBar, { drawerWidth } from "./router/NavigationBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <NavigationBar open={open} setOpen={setOpen} />
      <Switch>
        {Routes.map((route: RouteType) => (
          <Route exact path={route.path} key={route.path}>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <route.component />
            </main>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default App;
