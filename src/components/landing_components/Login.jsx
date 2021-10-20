import React, { useContext, useState }from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../user/UserContext";

const Login = () => {

    const userContext = useContext(UserContext);
    const [userData, setUserData] = userContext.userData;

    const history = useHistory();

    const [formValue, setformValue] = useState({
        username: '',
        password: ''
    });

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
                        setUserData(body);
                        sessionStorage.setItem('token', '123');
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
                <button
                    color="primary"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <Link to="/registration">Register</Link>
        </div>
    )

};

export default Login;
