import React, {useState} from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";

const Friends = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userFriend = JSON.parse(sessionStorage.getItem('friends'));

    const [formValue, setformValue] = useState({
        username: '',
        password: ''
    });

    function addFriends(friendsOf) {
        console.log("Below is FriendsOf");
        console.log(friendsOf);

        const url='http://localhost:8080/api/v1/friends/'+userData.username;
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formValue.username,
                    password: formValue.password
                })
            }).then(response => {
                if(response.ok){
                    console.log(response);
                    return response.json();
                }
            }).then(body => 
                {
                    sessionStorage.setItem('friends', JSON.stringify(body));
                    console.log(body)
                });
    }

    function searchUser(user) {
        console.log("Below is Search User");
        console.log(user);
        
        const url='http://localhost:8080/api/v1/user/searchUser/'+userData.username;
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formValue.username,
                })
            }).then(response => {
                if(response.ok){
                    console.log('response object: ');
                    console.log(response);

                    if(!response.username == ""){
                        <h3>response.username</h3>


                        console.log(response.username)
                    }
                    else{
                        alert("User not found!")
                    }
                    // return response.json();
                }
            })
            // .then(body => 
            //     {
            //         sessionStorage.setItem('friends', JSON.stringify(body));
            //         console.log(body)
            //     });

    }

    return (
        <Container fluid = "true" >
            <Row >
                <Col>
                    <h1>
                        Friends' List
                    </h1>

                    <table>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                            
                        </tr>


                    </table>
                
                
                </Col>

                <Col>
                
           
                    <h1>
                        Add Friend
                        <br/>
                    </h1>
                    <h5>  <input type="text" placeholder = "Search Username" />
                    <Button className = "addFriend" onClick = {searchUser}>Search</Button>
                    </h5>

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