import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetAccessToken, unSetRefreshToken } from "../features/authSlice";
import { unSetUserData } from "../features/userSlice";
import { removeToken } from "./LocalStorageService";
import { openSnackbar } from "../features/snackbarSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unSetUserData({ user_data: null }));
    dispatch(unSetAccessToken({ access_token: null }));
    dispatch(unSetRefreshToken({ refresh_token: null }));

    removeToken();
    dispatch(
      openSnackbar({
        message: "Logged Out Successfully!",
        severity: "error",
      })
    );
    navigate("/login");
  };

  return { handleLogout };
};

export default useLogout;
