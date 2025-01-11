// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...props }) => {
  const { access_token } = useSelector((state) => state.auth);

  return access_token ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
