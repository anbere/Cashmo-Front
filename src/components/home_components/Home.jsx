import React from "react";

import TransactionTable from "../tables/TransactionTable";

const HomePage = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));


    return (
        <>
            <h1>Welcome, {userData.username}</h1>
            <TransactionTable></TransactionTable>
        </>
    )
}

export default HomePage;