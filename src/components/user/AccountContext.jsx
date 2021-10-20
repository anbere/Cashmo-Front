import React, { useState, createContext, useEffect, useContext } from 'react';
import { UserContext } from "../user/UserContext";

export const AccountContext = createContext();

export const AccountProvider = (props) => {
    const [accountData, setAccountData] = useState(null);

    const userContext = useContext(UserContext);
    const [userData, setUserData] = userContext.userData;

    return (
        <AccountContext.Provider value={{ accountData: [accountData, setAccountData]}}>
            {props.children}
        </AccountContext.Provider>
    );

}