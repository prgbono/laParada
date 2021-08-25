import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...props }) {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...props}
      render={props =>
        userInfo ? <Component {...props}></Component> : <Redirect to="/login" />
      }
    ></Route>
  );
}
