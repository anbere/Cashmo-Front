import axios from "axios";
import React, { useState }from "react";
import { useHistory, Link } from "react-router-dom";

const Login = () => {

    const history = useHistory();

    const [formValue, setformValue] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // const { user, pass } = formValue;
        // console.log(formValue.username);

        // if(username.trim() && password.trim()) {
        //     localStorage.setItem('token', '123');
        //     history.push("/");
        // }

        // axios.post("http://localhost:8080/api/v1/user/login", 
        //     {
        //         username: user,
        //         password: pass
        //     },
        //     { headers: { "Content-Type": "application/json",
        //                  "Access-Control-Allow-Origin": "true",
        //                  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'}, withCredentials: true }
        // )
        // .then((response) => {
        //     console.log(response);
        // })

        fetch("http://localhost:8080/api/v1/user/login",
            {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formValue.username,
                    password: formValue.password
                })
            }).then(res => {
                if(res.ok){
                    console.log(res);
                    return res.json();
                }
            }).then(body => console.log(body));
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Login to Get Started</p>
                <input 
                    type="text"
                    name="username" 
                    placeholder="Username"
                    vlue={formValue.username}
                    onChange={handleChange}
                    autoComplete="off" 
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={handleChange} 
                />
                <button
                    color="primary"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <Link to="/registration">Register</Link>
        </>
    )

};

export default Login;
