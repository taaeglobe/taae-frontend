import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default PrivateRoute;
