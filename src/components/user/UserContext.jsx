import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData: [userData, setUserData]}}>
            {props.children}
        </UserContext.Provider>
    );

}