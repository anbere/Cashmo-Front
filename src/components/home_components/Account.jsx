import React from "react";
import { useHistory } from "react-router-dom";

const Account = () => {
    
    const history = useHistory();

    const handleLogout = () => {
        console.log("Logging out")
        localStorage.clear();
        history.push("/");
    }
    
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )

    
}

export default Account;