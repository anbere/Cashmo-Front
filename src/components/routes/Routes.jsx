import React, { useContext } from "react";
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { UserContext } from "../user/UserContext";

const AuthorizationContext = React.createContext();

const Routes = () => {
    // const token = sessionStorage.getItem('token');

    const userContext = useContext(UserContext);
    const [userData, setUserData] = userContext.userData;

    //conditionally route based on the token value

    return(
        <AuthorizationContext.Provider>
            { userData ? <PrivateRoute /> : <PublicRoute /> }
        </AuthorizationContext.Provider>
    )
}

export default Routes;