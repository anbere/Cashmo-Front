import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import CustModal from "./CustModal";

const Account = () => {

    const [modalShow, setModalShow] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({})
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userAccount = JSON.parse(sessionStorage.getItem('account'));

    const history = useHistory();

    const handleLogout = () => {
        console.log("Logging out")
        sessionStorage.clear();
        history.push("/");
    }

    function AccountView() {
        if (userAccount.routingNumber !== '') {
            return (
                <div className="user-deets">
                    <strong>Account Balance</strong> {userAccount.balance}
                    <br />
                    <Button className="accountBtn">Deposit</Button>
                    <p>
                        <strong>Account Number</strong> {userAccount.routingNumber}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        <strong>Account Balance</strong> {userAccount.balance}
                    </p>
                    <Button className="accountBtn">Link Bank Account</Button>
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
                            onSubmit={() => setUpdateInfo()}
                            onHide={() => setModalShow(false)} />
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