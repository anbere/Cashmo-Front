import React, {useState} from "react";
import { useHistory } from "react-router";
import { Button, Container, Row, Col, Modal, Table } from "react-bootstrap";

const Money = () => {

    const [transInfo, setTransInfo] = useState({
        destination: '',
        type: '',
        amount: '',
        comment: '',
    });

    const history = useHistory();
    const userData = JSON.parse(sessionStorage.getItem('user'));
    // const userTransaction = JSON.parse(sessionStorage.getItem('transaction'));

    const handleTransaction = (event) => {
        setTransInfo({
            ...transInfo,
            [event.target.name]: event.target.value
        })
        // event.preventDefault()
        console.log("BELOW IS TRANS INFO");
        console.log(transInfo);
        // transactionPay(transInfo.destination);
    }

    function transactionPay(destUsername) {
        console.log("Below is the Transaction Username: " + userData.username);
        // console.log(transactionUsername);
        console.log(userData)

        const url='http://localhost:8080/api/v1/pay/'+userData.username + '/' + destUsername;
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    destination: transInfo.destination,
                    type: transInfo.type,
                    amount: transInfo.amount,
                    comment: transInfo.comment
                }) 
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
                console.log("BELOW IS RESPONSE");
                console.log(response);
            }).then(body => 
                {
                    console.log(body)
                    // getTransaction();
                });
    }

    function getTransaction() {
        console.log("Below is Transaction");
        const url='http://localhost:8080/api/v1/transaction/';
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
                    sessionStorage.setItem('transaction', JSON.stringify(body));
                    history.push("/transaction")
                    console.log(body)
                });
    }
    return (
        <Container fluid = "true" >
            <Row >
                <Col>
                    <h1>
                        {userData.firstName}'s Transaction Summary
                    </h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr >
                                <td>From</td>
                                <td>Type</td>
                                <td>Amount</td>
                                <td>Comment</td>
                                <td>Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                        {/* <tbody> {
                            // userTransaction.map((transaction) => (

                            //     <tr key = {transaction.id}>
                            //         <td>{transaction.username}</td>
                            //         <td>{transaction.firstName}</td>
                            //         <td>{transaction.lastName}</td>
                            //         <td>{transaction.email}</td>
                            //     </tr>   
                            //     ))  
                        }            
                        </tbody> */}
                    </Table>
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
                                    <input 
                                        type="text" 
                                        value = {transInfo.destination} 
                                        onChange = {handleTransaction} 
                                        placeholder = "Type in username" 
                                        name = "destination"
                                    />
                                </div>
                                <div class="col-10">
                                    <label for="type"  required>Type:</label>
                                </div>
                    <div class="col-90">
                        <select name="type" id="type" 
                            value = {transInfo.type}
                            onChange = {handleTransaction}>
                            <option value="">Select Type:</option>
                                <option value="pay">Pay</option>
                                <option value="request">Request</option>
                        </select>

                        </div>
                            </div>
                                <div class="row">
                                <label for="amount">Amount:</label>
                                    <div class="col-10">
                                    <input 
                                        type="number"
                                        name="amount"
                                        placeholder="Enter an amount"
                                        value={transInfo.amount}
                                        onChange={handleTransaction} 
                                        min = "1"
                                    />
                                    <br/>
                                    </div>
                                    {/* <div class="col-90">
                                        <input type="number" id="amount" name="amount" maxlength="8" min="1" placeholder = "Enter an amount"/>
                                    </div> */}
                                </div>
                                <div class="row">
                                    <div class="col-10">
                                        <label for="address">Comment:</label>
                                    </div>

                                    <div class="col-90">
                                        <textarea name="description" 
                                        value = {transInfo.comment} 
                                        onChange = {handleTransaction} 
                                        id="description" 
                                        cols="30" rows="10" 
                                        placeholder="Write your comment here"></textarea>
                                    </div>
                                    
                                </div>

                                <div class="">
                                    <form action="">
                                        <Button type= "submit" onChange = {(e) => setTransInfo(e.target.value)} value = {transInfo} className = "createTransaction" style = {{color: "white", backgroundColor: "salmon"}}   >Submit</Button>
                                        {/* <input type="button" value="Pay" onclick="createTicket()"/>
                                        <input type="button" value = "Request" onClick = "" /> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    
    )
    
  
}

export default Money;