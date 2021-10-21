import React, { useState }from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {

    const history = useHistory();

    const [formValue, setformValue] = useState({
        username: '',
        password: ''
    });
    
    function getAccount(id) {
        const url='http://localhost:8080/api/v1/account/'+id;
        fetch(url,
            {
                method: "GET",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
            }).then(response => {
                if(response.ok){
                    console.log(response);
                    return response.json();
                }
            }).then(body => 
                {
                    console.log(body)
                    if(!body.id == "")
                    {
                        console.log(body);
                        sessionStorage.setItem('account', JSON.stringify(body));
                    }else(alert("account not receieved"))
                });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/v1/user/login",
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
                    console.log(body)
                    if(!body.username=="")
                    {
                        getAccount(body.id);
                        sessionStorage.setItem('user', JSON.stringify(body));
                        history.push("/");
                    }else(alert("Invalid login"))
                });

        
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
                <p>Login to Get Started</p>
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
                <Button
                    color="primary"
                    type="submit"
                >
                    Login
                </Button>
            </form>

            <Link to="/registration">Register</Link>
        </div>
    )

};

export default Login;
