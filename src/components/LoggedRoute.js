import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const LoggedRoute = ({ component: RouteComponent, ...restProps }) => {
  const { currentUser } = useContext(AuthContext);

  //Redirect to login page if not authenticated
  return (
      <Route
        {...restProps}
        render={(props) => {
          return currentUser ? (
            props.location.pathname == "/" ? (
              <Redirect to='/dashboard/chats' />
            ) : (
              <RouteComponent {...props} />
            )
          ) : (
            <Redirect to='/auth/login' />
          );
        }}></Route>
    )
};

export default LoggedRoute;
