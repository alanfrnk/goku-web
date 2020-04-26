import React from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { history } from './configs';
import { userConstants } from './constants';
import Login from "./pages/Login";
import SigIn from "./pages/SignIn";
import Layout from "./components/Layout";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(userConstants.TOKEN_KEY) !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={SigIn} />
      <PrivateRoute path="/app" component={Layout} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

export default Routes;