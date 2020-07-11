import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Link,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect, MapStateToProps } from "react-redux";
import { AnyAction } from "redux";
import { login } from "../../store/user/actions";
import { IUserState } from "../../store/user/types";
import { AppState } from "../../store/rootReducer";
import { ThunkDispatch } from "redux-thunk";

const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

interface IStateProps {
  user: IUserState;
}

interface IDispatchProps {
  loginAsync: (email: string, password: string) => Promise<void>;
}

type ISignInProps = IDispatchProps & IStateProps;

const SignInScreen: React.FC<ISignInProps> = ({
  loginAsync,
  user,
}: ISignInProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const unmounted = useRef<boolean>(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(!open);
    loginAsync(email, password).then(() => {
      if (!unmounted.current) {
        setOpen(false);
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={login} noValidate>
          <TextField
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {user.error !== undefined && (
            <Alert severity="error">{user.error}</Alert>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps: MapStateToProps<IStateProps, {}, AppState> = (
  state: AppState
): IStateProps => ({
  user: state.user,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, AnyAction>
): IDispatchProps => {
  return {
    loginAsync: (email, password) => dispatch(login(email, password)),
  };
};

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
