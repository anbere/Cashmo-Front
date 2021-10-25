import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import CustModal from "./CustModal";
import NumberFormat from "react-number-format";

const Account = () => {

    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);

    const userData = JSON.parse(sessionStorage.getItem('user'));
    // const userAccount = JSON.parse(sessionStorage.getItem('account'));
    const [userAccount, setUserAccount] = useState([]);
    const [depositTransaction, setDepositTransaction] = useState({})

    const [routingNumber, setRoutingNumber] = useState({
        ...userAccount
    });

    useEffect(() => {
		async function loadRequests() {
			const temp = await JSON.parse(sessionStorage.getItem('account'))
            setUserAccount(temp);
		}
		
		loadRequests();
		
	}, [sessionStorage.getItem('account')])

    

    const handleLogout = () => {
        console.log("Logging out")
        sessionStorage.clear();
        history.push("/");
    }

    const handleAccountChange = (event) => {
        setRoutingNumber({
            ...userAccount,
            [event.target.name]: event.target.value
        })
    }

    const handleDepositChange = (event) => {
        setDepositTransaction({
            "type": "Deposit",
            [event.target.name]: event.target.value,
            "comment": ''
        })
    }

    const linkAccount = (event) =>
    {
        event.preventDefault();
        console.log("Account before sent: ", routingNumber);

        fetch("http://localhost:8080/api/v1/account",
            {
                method: "PUT",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(routingNumber)
            }).then(response => response.json()
            )
            .then(body => {
                console.log("body: ", body)
                if(body.routingNumber !== null) {
                  sessionStorage.setItem('account', JSON.stringify(body))
                  history.push("/account");
                  alert("Bank account linked");
                }
                else{
                    alert("Bank account not linked");
                }
            })
    }

    const getTransactions = () => {
		const url = 'http://localhost:8080/api/transaction/' + userData.username;

		fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			})
		.then(response => {
		    if (response.ok) {
		        console.log(response);
		        return response.json();
		    }
		}).then(body => {
		    console.log("List of transactions: ", body);
		    sessionStorage.setItem('transactions', JSON.stringify(body))
				history.push("/account")
		});
	}

    const sendDeposit = (event) =>
    {
        event.preventDefault();
        console.log("Deposit Transaction before sent: ", depositTransaction);

        const url = "http://localhost:8080/api/transaction/deposit/"+userData.username;
        fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(depositTransaction)
            }).then(response => response.json()
            )
            .then(body => {
                console.log("body received form sendDeposit: ", body)
                if(body.id !== null) {
                    sessionStorage.setItem('account', JSON.stringify(body))
                    getTransactions();
                    history.push("/account");
                    alert("Deposit succesful")
                }
                else{
                    alert("Deposit failed")
                }
            })
    }

    function AccountView() {
        if (userAccount.routingNumber !== null) {
            return (
                <div className="user-deets">
                    <p>
                        <strong>Account Balance</strong> 
                        <NumberFormat value={ userAccount.balance } displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    </p>
                    
                    <form >
                        <input 
                            type="text" 
                            name="amount"
                            placeholder="Deposit Amount" 
                            onChange={handleDepositChange}
                            autoComplete="off"
                            />
                        <Button className="accountBtn" onClick={sendDeposit}>Deposit</Button>
                    </form>
                    <p>
                        <strong>Account Number</strong> {userAccount.routingNumber}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        <strong>Account Balance</strong> 
                        <NumberFormat value={userAccount.balance} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
                    </p>
                    <form>
                        <input 
                            type="text" 
                            name="routingNumber"
                            placeholder="Routing Number" 
                            onChange={handleAccountChange}
                            autoComplete="off"
                            />
                        <Button className="accountBtn" onClick={linkAccount}>Link Bank Account</Button>
                    </form>
                    
                </div>
            )
        }
    }

    return (
        <Container fluid="true">
            <Row className="App">
                <Col>
                    <div className="user-deets">
                        <img src={
                            userData.avatar ? userData.avatar : 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'
                        } alt={userData.username} />
                    </div>
                </Col>
                <Col>
                    <div className="user-deets">
                        <h4>
                            <strong>Username</strong> {userData.username}
                        </h4>
                        <p>
                            <strong>Email</strong> {userData.email}
                        </p>
                        <p>
                            <strong>First Name</strong> {userData.firstName}
                        </p>
                        <p>
                            <strong>Last Name</strong> {userData.lastName}
                        </p>
                        <Button className="editBtn" onClick={() => setModalShow(true)}>Edit Profile</Button>
                        <br />
                        <Button className="logoutBtn" onClick={handleLogout}>Logout</Button>

                        <CustModal
                            show={modalShow}
                            user={userData}
                            update={() => console.log("heh")}
                            onHide={() => setModalShow(false)} 
                        />
                    </div>
                </Col>
            </Row>
            <Row className="App">
                <Col>
                    {AccountView()}
                </Col>
            </Row>
        </Container>
    )

}

export default Account;