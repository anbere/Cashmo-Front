import React from "react";
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AuthorizationContext = React.createContext();

const Routes = () => {
    const token = localStorage.getItem('token');

    //conditionally route based on the token value

    return(
        <AuthorizationContext.Provider value={token}>
            { token ? <PrivateRoute /> : <PublicRoute /> }
        </AuthorizationContext.Provider>
    )
}

export default Routes;