import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  // useGoogleLoginMutation,
} from "../../services/userAuthApi";
import { storeToken, storeUserData } from "../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../features/authSlice";
import { setUserData } from "../../features/userSlice";
import SendPasswordResetEmail from "./SendPasswordResetEmail";
import { openSnackbar } from "../../features/snackbarSlice";

const Login = () => {
  const styles = {
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "2rem",
    },
  };
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  // const [googleLogin, { isLoading: isLoadingGoogle }] =
  //   useGoogleLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const res = await login(actualData);

    if (res.error) {
      setServerError(res.error.data.errors);
      dispatch(
        openSnackbar({
          message: "Login failed!",
          severity: "error",
        })
      );
    }
    if (res.data) {
      const token = res.data.token;
      const access_token = token.access;
      const refresh_token = token.refresh;
      const user_data = res.data.user_data;
      storeToken(token);
      storeUserData(user_data);
      dispatch(
        setAccessToken({
          access_token: access_token,
        })
      );
      dispatch(
        setRefreshToken({
          refresh_token: refresh_token,
        })
      );
      dispatch(
        setUserData({
          user_data: user_data,
        })
      );
      dispatch(
        openSnackbar({
          message: "Login Successfull!",
          severity: "success",
        })
      );
      navigate("/");
    }
  };

  // const handleGoogleSignIn = async () => {
  //   const res = await googleLogin();
  //   if (res.error) {
  //     setServerError(res.error.data.errors);
  //   }
  //   if (res.data) {
  //     storeToken(res.data.token);
  //     let { access_token } = getToken();
  //     dispatch(setUserToken({ access_token: access_token }));
  //     navigate("/profile");
  //   }
  // };

  // let { access_token } = getToken();
  // useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }));
  // }, [access_token, dispatch]);

  const [openSendResetPassword, setOpenSendResetPassword] = useState(false);
  const handleSendResetPassword = () => {
    setOpenSendResetPassword(true);
  };
  const handleCloseSendResetPassword = () => {
    setOpenSendResetPassword(false);
  };

  return (
    <>
      <Modal
        open={openSendResetPassword}
        onClose={handleCloseSendResetPassword}
      >
        <div style={styles.paper}>
          <SendPasswordResetEmail />
        </div>
      </Modal>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
        />
        {server_error.email ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.email[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {server_error.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.password[0]}
          </Typography>
        ) : (
          ""
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isLoadingLogin}
        >
          {isLoadingLogin ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
        {server_error.non_field_errors ? (
          <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
        {/* <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleGoogleSignIn}
          disabled={isLoadingGoogle}
        >
          {isLoadingGoogle ? (
            <CircularProgress size={24} />
          ) : (
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              sx={{ mr: 1 }}
            />
          )}
          Sign In With Google
        </Button> */}
        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          <Button
            onClick={handleSendResetPassword}
            variant="contained"
            color="primary"
          >
            Forgot Password ?
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
