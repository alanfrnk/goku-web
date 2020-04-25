import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from './configs/history';
import Login from "./pages/Login";
import SigIn from "./pages/SignIn";

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={SigIn} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;