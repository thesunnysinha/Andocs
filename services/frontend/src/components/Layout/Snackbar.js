import React from "react";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Portal } from "@mui/base/Portal";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../..//features/snackbarSlice";

// create slide transition
const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// create alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Portal>
      <Snackbar
        TransitionComponent={SlideTransition}
        style={{ top: "10%" }}
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default SnackBar;
