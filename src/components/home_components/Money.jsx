import React, {useState} from "react";
import { useHistory } from "react-router";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";

const Money = () => {


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
                console.log("BELOW IS RESPONSE");
                console.log(response);
                if(friendUsername === response.username){
                    console.log("Added friendUsername is: " + friendUsername)
                    console.log("Added userFriend is: " + response.username)
                    alert("Friend Added!")
                }
                else{
                    console.log("!Found friendUsername is: " + friendUsername)
                    console.log("!Found userFriend is: " + response.username)
                    alert("Friend not found!")
                }
            }).then(body => 
                {
                    console.log(body)
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
                        {userData.firstName}'s Transactions
                    </h1>
                    <table>
                        <thead>
                            <tr style={{fontWeight: "BOLD", color: "red", backgroundColor: "white"}}>
                                <td>From</td>
                                <td>Type</td>
                                <td>Amount</td>
                                <td>Comment</td>
                                <td>Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                        <tbody> {
                            userFriend.map((friends) => (
                                <tr key = {friends.id}>
                                    <td>{friends.username}</td>
                                    <td>{friends.firstName}</td>
                                    <td>{friends.lastName}</td>
                                    <td>{friends.email}</td>
                                </tr>   
                                ))}            
                        </tbody>
                    </table>
                </Col>
                <Col>
                    <div>
                        <h1>Make a Transaction</h1>
                        <div class="container">
                            <div class="row">
                                <div>
                                    <label>To: </label>
                                </div>
                                <div>
                                    <input type="text" placeholder = "Type in username" name = "To:"/>
                                </div>
                                <div class="col-10">
                                    <label for="type"  required>Type:</label>
                                </div>
                    <div class="col-90">
                    <select name="type" id="type">
                        <option value=" ">Select Type:</option>
                        <option value="pay">Pay</option>
                        <option value="request.">Request.</option>
                    </select>
                        </div>
                            </div>
                                <div class="row">
                                    <div class="col-10">
                                        <label for="amount">Amount:</label>
                                    </div>

                                    <div class="col-90">
                                        <input type="number" id="amount" name="amount" maxlength="8" min="1" placeholder = "Enter an amount"/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-10">
                                        <label for="address">Comment:</label>
                                    </div>

                                    <div class="col-90">
                                        <textarea name="description" id="description" cols="30" rows="10" placeholder="Write your comment here"></textarea>
                                    </div>
                                    
                                </div>

                                <div class="">
                                    <button type= "submit" style = {{color: "white", backgroundColor: "salmon"}}   >Submit</button>
                                    {/* <input type="button" value="Pay" onclick="createTicket()"/>
                                    <input type="button" value = "Request" onClick = "" /> */}
                                </div>
                            </div>
                        </div>
                </Col>

            </Row>
        </Container>
    
    )
    
  
}

export default Money;