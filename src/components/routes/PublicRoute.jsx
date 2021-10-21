import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../landing_components/Login'
import Registration from "../landing_components/Registration";

const PublicRoute = (props) => {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />

            <Redirect to="/login" />
        </Switch>

    )
}

export default PublicRoute;