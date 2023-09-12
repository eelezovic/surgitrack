import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoutes({isSignedIn, children}) {
  if (!isSignedIn) {
    return <Navigate to="/" />
  }
  return children

}

export default PrivateRoutes;
