import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Link } from 'react-router-dom'

const Registration = () => {

    const history = useHistory();

    const [formValue, setformValue] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const { username, password, email, firstName, lastName } = formValue;
        console.log(username, password, email, firstName, lastName)

        fetch("http://localhost:8080/api/v1/user",
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formValue.username,
                    password: formValue.password,
                    email: formValue.email,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName
                })
            }).then(response => response.json()
            )
            .then(body => {
                console.log("body: ", body)
                if(body.success) {
                    alert("Registration successful! Click ok to be taken to the log in screen.");
                    history.push("/");
                }
                else{
                    alert(body.message);
                }
            })
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="App">
            <form className="logister" onSubmit={handleSubmit}>
                <p>Register a new account</p>

                <input 
                    type="text"
                    name="username" 
                    placeholder="Username"
                    value={formValue.username}
                    onChange={handleChange}
                    autoComplete="off" 
                />
                <br/>
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formValue.firstName}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formValue.lastName}
                    onChange={handleChange} 
                />
                <br/>
                <Button
                    color="primary"
                    type="submit"
                >
                    Register
                </Button>
            </form>

            <Link to="/login">Return to Login</Link>
        </div>
    )
}

export default Registration;