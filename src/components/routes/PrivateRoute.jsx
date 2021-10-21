import React from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import HomePage from "../home_components/Home";
import Money from "../home_components/Money"
import Friends from "../home_components/Friends";
import Account from "../home_components/Account";
import { Nav, Navbar, Container} from "react-bootstrap";
import '../../App.css';

const PrivateRoute = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>CashMo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link as={Link} to="/home">Home</Nav.Link>

                            <Nav.Link as={Link} to="/money">Money</Nav.Link>

                            <Nav.Link as={Link} to="/friends">Friends</Nav.Link>

                            <Nav.Link as={Link} to="/account">Account</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route path="/home" exact component={HomePage} />
                <Route path="/money" exact component={Money} />
                <Route path="/friends" exact component={Friends} />
                <Route path="/account" exact component={Account} />

                <Redirect to="/home" />
            </Switch>
        </>
    )
}

export default PrivateRoute;