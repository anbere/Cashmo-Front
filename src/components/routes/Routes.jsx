import React from "react";
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AuthorizationContext = React.createContext();

const Routes = () => {
    // const token = sessionStorage.getItem('token');
    const userData = JSON.parse(sessionStorage.getItem('user'))

    //conditionally route based on the token value

    return(
        <AuthorizationContext.Provider value = {userData}>
            { userData ? <PrivateRoute /> : <PublicRoute /> }
        </AuthorizationContext.Provider>
    )
}

export default Routes;