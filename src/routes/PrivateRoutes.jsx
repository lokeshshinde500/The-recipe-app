import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default PrivateRoutes;
