import React, { Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavigationBarPublic: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Faccloud
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default NavigationBarPublic;
