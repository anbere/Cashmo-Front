import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../user/UserContext";

const Account = () => {

    const userContext = useContext(UserContext);
    const [userData, setUserData] = userContext.userData;

    const history = useHistory();

    const handleLogout = () => {
        console.log("Logging out")
        sessionStorage.clear();
        setUserData(null);
        history.push("/");
    }

    const userAccount = {
        balance: '$500',
        accountNumber: ''
    }

    function AccountView() {
        if (userAccount.accountNumber !== '') {
            return (
                <div className="user-deets">
                    <strong>Account Balance</strong> {userAccount.balance}
                    <br />
                    <button className="accountBtn">Deposit</button>
                    <p>
                        <strong>Account Number</strong> {userAccount.accountNumber}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        <strong>Account Balance</strong> {userAccount.balance}
                    </p>
                    <button className="accountBtn">Link Bank Account</button>
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
                        <button className="editBtn">Edit Profile</button>
                        <br />
                        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
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