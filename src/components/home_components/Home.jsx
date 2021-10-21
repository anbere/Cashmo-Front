import React from "react";

const HomePage = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <p>Welcome, {userData.username}</p>
        </>
    )
}

export default HomePage;