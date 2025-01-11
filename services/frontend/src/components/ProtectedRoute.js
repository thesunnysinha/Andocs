// components/ProtectedRoute.js

import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, redirectTo, ...rest }) => {
  const { access_token } = useSelector((state) => state.auth);

  if (!access_token) {
    return <Navigate to={redirectTo} />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
