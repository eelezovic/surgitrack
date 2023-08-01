import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoutes({isSignedIn, children}) {
  if (!isSignedIn) {
    return <Navigate to="/" />
  }
  return children

}

export default PrivateRoutes;








/*import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () {
  let auth = {"token":false}

  return (
    auth.token ? <Outlet /> : <Navigate to="/"/>

  )
}

export default PrivateRoutes;*/