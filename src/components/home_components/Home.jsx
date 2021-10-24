import React from "react";
import "./Home.css"

const HomePage = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));
    return (
        <>
            <h1>Welcome, {userData.username}</h1>
        </>
    )
}

export default HomePage;