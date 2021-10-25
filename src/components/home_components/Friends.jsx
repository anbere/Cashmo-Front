import e from "cors";
import React, {useState} from "react";
import { useHistory } from "react-router";
import { Button, Container, Row, Col, Table } from "react-bootstrap";

const Friends = () => {

    const history = useHistory();
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userFriend = JSON.parse(sessionStorage.getItem('friends'));

    const [friendName, setFriendName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(friendName);
        addFriends(friendName);
    }

    function addFriends(friendUsername) {
        console.log("Below is FriendsOf");
        console.log(friendUsername);
        console.log(userData)

        const url='http://localhost:8080/api/v1/friends/'+friendUsername;
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData) //sending in the user object and a username

            }).then(response => {
                if(response.ok){
                    return response.json();
                }
              
           
            }).then(body => 
                {
                    console.log("BELOW IS RESPONSE");
                    console.log(body);
                    if(!body.username == ""){
                        console.log("Added friendUsername is: " + friendUsername)
                        console.log("Added userFriend is: " + body.username)
                        alert("Friend Added!")
                    }
                    else{
                        console.log("!Found friendUsername is: " + friendUsername)
                        console.log("!Found userFriend is: " + body.username)
                        alert("Friend not found!")
                    }
                    getFriends();
                });
    }

    function getFriends() {
        console.log("Below is FriendsOf");
        const url='http://localhost:8080/api/v1/friends/';
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password
                })
            }).then(response => {
                if(response.ok){
                    console.log(response);
                    return response.json();
                }
            }).then(body => 
                {
                    sessionStorage.setItem('friends', JSON.stringify(body));
                    history.push("/friends")
                    console.log(body)
                });
    }
    return (
        <Container fluid = "true" >
            <Row >
                <Col>
                    <h1>
                        Friends
                    </h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Username</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                userFriend.length > 0?
                                userFriend.map((friends) => (
                                <tr key = {friends.id}>
                                    <td>{friends.username}</td>
                                    <td>{friends.firstName}</td>
                                    <td>{friends.lastName}</td>
                                    <td>{friends.email}</td>
                                </tr>   
                                )):<tr/>
                            }            
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h1>
                        Add Friend
                        <br/>
                    </h1>
                    <form onSubmit={handleSubmit}>  
                        <input type="text" onChange={(e) => setFriendName(e.target.value)} value={friendName}  placeholder="Friend Username"/>
                        <Button type="submit" className="addFriend">Search</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    
    )
}
export default Friends;



{/* <br></br><br></br>
<h1 >Welcome, {userData.username}</h1>
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

//     {/* style={{textAlign: center}} */}
// </div>
// <br></br><br></br><br></br>
// <div >
//     <button type="submit" id="prev" onClick="#">Prev</button>
//     <button type="submit" id="next" onClick="#">Next</button>
// </div> */}