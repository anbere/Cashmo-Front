import React from "react";
import "./Home.css"

const HomePage = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));


    return (
        <>
            <br></br><br></br>
            <h1 style={{textAlign: center}}>Welcome, {userData.username}</h1>
            <br></br><br></br><br></br>
            <h2>Feed</h2>
            <br></br>
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                    </tr>
                </table>
            </div>
            <br></br><br></br><br></br>
            <div style={{textAlign: center}}>
                <button type="submit" id="prev" onClick="#">Prev</button>
                <button type="submit" id="next" onClick="#">Next</button>
            </div>
        </>
    )
}

export default HomePage;