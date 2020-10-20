import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const LoggedRoute = ({ component: RouteComponent, ...restProps }) => {
  const { currentUser } = useContext(AuthContext);

  //Redirect to login page if not authenticated
  return (
    <Route
      {...restProps}
      render={(props) =>
        currentUser ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }></Route>
  );
};

export default LoggedRoute;
