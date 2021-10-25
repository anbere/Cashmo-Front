import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {

	const history = useHistory();

	const [formValue, setformValue] = useState({
		username: '',
		password: ''
	});

	const getFriends = async () => {
		const url = 'http://localhost:8080/api/v1/friends/';
		const request = await fetch(url,
			{
				method: "POST",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: formValue.username,
					password: formValue.password
				})
			})
		const response = await request.json();
		return response;

		// sessionStorage.setItem('friends', JSON.stringify(response));

		// .then(response => {
		//     if(response.ok){
		//         console.log(response);
		//         return response.json();
		//     }
		// }).then(body => 
		//     {
		//         sessionStorage.setItem('friends', JSON.stringify(body));
		//         console.log("Friends list: ", body)
		//     });
	}

	const getAccount = async (id) => {
		const url = 'http://localhost:8080/api/v1/account/' + id;
		const request = await fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			})
		const response = await request.json();
		return response;

		// if (!response.id == "") {
		// 	console.log("response from getAccount: ", response);
		// 	sessionStorage.setItem('account', JSON.stringify(response));
		// } else (alert("account not receieved"))


		// .then(response => {
		//     if (response.ok) {
		//         console.log(response);
		//         return response.json();
		//     }
		// }).then(body => {
		//     console.log(body)
		//     if (!body.id == "") {
		//         console.log(body);
		//         sessionStorage.setItem('account', JSON.stringify(body));
		//     } else (alert("account not receieved"))
		// });
	}

	const getTransactions = async () => {
		const url = 'http://localhost:8080/api/transaction/' + formValue.username;

		const request = await fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			})
		const response = await request.json();
		return response;
		// console.log("List of transactions: ", response);
		// sessionStorage.setItem('transactions', JSON.stringify(response))

		// .then(response => {
		//     if (response.ok) {
		//         console.log(response);
		//         return response.json();
		//     }
		// }).then(body => {
		//     console.log("List of transactions: ", body);
		//     sessionStorage.setItem('transactions', JSON.stringify(body))
		// });
	}

	const getRequests = async () => {
		console.log("Below is Transaction");
		const url = 'http://localhost:8080/api/transaction/request/' + formValue.username;
		const request = await fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			})

			const response = await request.json();
			return response;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const request = await fetch("http://localhost:8080/api/v1/user/login",
			{
				method: "POST",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: formValue.username,
					password: formValue.password
				})
			})
		const response = await request.json();

		if(!response.username == "") {
		
		const transacts = await getTransactions();
		const friends = await getFriends();
		const accounts = await getAccount(response.id);
		const requests = await getRequests();

		sessionStorage.setItem('user', JSON.stringify(response))
		sessionStorage.setItem('friends', JSON.stringify(friends));
		sessionStorage.setItem('account', JSON.stringify(accounts));
		sessionStorage.setItem('transactions', JSON.stringify(transacts));
		sessionStorage.setItem('requests', JSON.stringify(requests));
		history.push("/");

	}else (alert("Invalid Credentials"))
		
			// .then(response => {
			// 	if (response.ok) {
			// 		console.log(response);
			// 		return response.json();
			// 	}
			// }).then(body => {
			// 	console.log(body)
			// 	if (!body.username == "") {
			// 		getTransactions();
			// 		getAccount(body.id);
			// 		getFriends();
			// 		sessionStorage.setItem('user', JSON.stringify(body));
			// 		history.push("/");
			// 	} else (alert("Invalid login"))
			// });
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
				<br />
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formValue.password}
					onChange={handleChange}
				/>
				<br />
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