import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Container, Row, Col, Modal, Table } from "react-bootstrap";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import NumberFormat from "react-number-format";

const Money = () => {

	const [transInfo, setTransInfo] = useState({
		destination: '',
		type: '',
		amount: '',
		comment: '',
	});

	const history = useHistory();
	const userData = JSON.parse(sessionStorage.getItem('user'));

	const [requestTransactions, setRequestTransactions] = useState([]);

	useEffect(() => {
		async function loadRequests() {
			const temp = await JSON.parse(sessionStorage.getItem('requests'))
            setRequestTransactions(temp);
		}
		
		loadRequests();
		
	}, [sessionStorage.getItem('requests')])

	const handleTransaction = (event) => {
		setTransInfo({
			...transInfo,
			[event.target.name]: event.target.value
		})
	}

	const transactionSubmit = (event) => {
		event.preventDefault();

		console.log("submittting transaction: ", transInfo)
		if(transInfo.type == 'pay') {
			transactionPay();
		}else{ // request
			transactionRequest();
		}
	}

	const denyRequest = (e) => {
		console.log(e);
		console.log(e.originUsername);
		const requestName = e.originUsername;

		// /accept/{choice}
		const url = 'http://localhost:8080/api/transaction//accept/reject';
		fetch(url,
			{
				method: "PUT",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					e
				)
			}).then(response => {
				if (response.ok) {
					console.log("BELOW IS RESPONSE");
					console.log(response);
					return response.json();
				}
			}).then(body => {
				console.log(body)
				alert("Request was from " + requestName + " was denied!")
				getRequests();
				getTransactions();
				getAccount();
			});
	}

	const acceptRequest = (e) => {
		console.log(e);
		console.log(e.originUsername);
		const tempAmount = e.amount;

		// /accept/{choice}
		const url = 'http://localhost:8080/api/transaction//accept/accept';
		fetch(url,
			{
				method: "PUT",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					e
				)
			}).then(response => {
				if (response.ok) {
					console.log("BELOW IS RESPONSE");
					console.log(response);
					return response.json();
				}
			}).then(body => {
				console.log(body)
				alert("Request was accepted, you paid: " + tempAmount)
				getRequests();
				getTransactions();
				getAccount();
			});
	}

	function transactionPay() {
		console.log("Below is the Transaction Username: " + userData.username);
		// console.log(transactionUsername);
		console.log(userData)

		const url = 'http://localhost:8080/api/transaction/pay/' + userData.username + '/' + transInfo.destination;
		fetch(url,
			{
				method: "POST",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					transInfo
				)
			}).then(response => {
				if (response.ok) {
					return response.json();
				}
				console.log("BELOW IS RESPONSE");
				console.log(response);
			}).then(body => {
				console.log(body)
				if(body.status == 'failed')
				{
					alert("Transaction failed")
					return;
				}
				getTransactions();
				getAccount();
				alert("Payment has been sent!")
			});
	}

	const getRequests = () => {
		console.log("Below is Transaction");
		const url = 'http://localhost:8080/api/transaction/request/' + userData.username;
		fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			}).then(response => {
				if (response.ok) {
					console.log("BELOW IS RESPONSE");
					console.log(response);
					return response.json();
				}
			}).then(body => {
				console.log(body)
				sessionStorage.setItem('requests', JSON.stringify(body))
				history.push("/money")
			});
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
				history.push("/money")
		});
	}

	const getAccount = () => {
		const url = 'http://localhost:8080/api/v1/account/' + userData.id;
		fetch(url,
			{
				method: "GET",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
			})
			.then(response => {
				if(response.ok)
				{
					return response.json();
				}
			}).then(body => {
				sessionStorage.setItem('account', JSON.stringify(body));
			})

	}

	const transactionRequest = () => {
		console.log("Below is the Transaction Username: " + userData.username);
		// console.log(transactionUsername);
		console.log(userData)

		const url = 'http://localhost:8080/api/transaction/request/' + userData.username + '/' + transInfo.destination;
		fetch(url,
			{
				method: "POST",
				mode: 'cors',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					transInfo
				)
			}).then(response => {
				if (response.ok) {
					return response.json();
				}
				console.log("BELOW IS RESPONSE");
				console.log(response);
			}).then(body => {
				console.log("Response from sending request:", body)
				if(body.status == 'failed')
				{
					alert("Transaction failed")
					return;
				}
				getRequests();
				getTransactions();
				getAccount();
				alert("Request has been sent!")
			});
	}

	const buttonStyle = {
		textAlign: "center"
	};

	const buttonRender = (transaction) => {
		if(transaction.status == 'success' || transaction.status == 'rejected')
		{return(
			<div></div>
		)}
		else
		{
			return(
				<>
					<Button className="acceptBtn" onClick={() => acceptRequest(transaction)}style={{backgroundColor:'lightgreen', border: '2px solid green'}}  ><BsFillCheckCircleFill/></Button>
					<Button className="denyBtn" onClick={() => denyRequest(transaction)} style={{backgroundColor:'red', border: '2px solid darkred'}}><BsFillXCircleFill/></Button>
				</>
			)
		}
	}

	return (
		<Container fluid="true" >
			<Row className="">
				<Col>
					<h1>
						{userData.firstName}'s Transaction Requests
					</h1>
					<Table striped bordered hover>
						<thead>
							<tr >
								<td>From</td>
								<td>Type</td>
								<td>Amount</td>
								<td>Comment</td>
								{/* <td>Date</td> */}
								<td>Status</td>
								<td>Action</td>
							</tr>
						</thead>
						<tbody>
							{
								requestTransactions.length > 0 ?
									requestTransactions.map((transaction) => (
										<tr key={transaction.id}>
											<td>{transaction.originUsername}</td>
											<td>{transaction.type}</td>
											<td>
											<NumberFormat value={transaction.amount} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
											</td>
											<td>{transaction.comment}</td>
											{/* <td>{transaction.time}</td> */}
											<td>{transaction.status}</td>
											<td style={buttonStyle}>{buttonRender(transaction)}
												{/* <Button className="acceptBtn" onClick={() => acceptRequest(transaction)}style={{backgroundColor:'lightgreen', border: '2px solid green'}}  ><BsFillCheckCircleFill/></Button>
												<Button className="denyBtn" style={{backgroundColor:'red', border: '2px solid darkred'}}><BsFillXCircleFill/></Button> */}
											</td>
										</tr>
									)) : <tr />
							}
						</tbody>
					</Table>
				</Col>
				<Col>
					<div>
						<h1>Make a Transaction</h1>
						<form>
							<div className="row">
								<div>
									<label>To: </label>
								</div>
								<div>
									<input
										type="text"
										value={transInfo.destination}
										onChange={handleTransaction}
										placeholder="Type in username"
										name="destination"
										autoComplete="off"
									/>
								</div>
								<div className="col-10">
									<label htmlFor="type" required>Type:</label>
								</div>
								<div className="col-90">
									<select name="type" id="type"
										value={transInfo.type}
										onChange={handleTransaction}>
										<option value="">Select Type:</option>
										<option value="pay">Pay</option>
										<option value="request">Request</option>
									</select>
								</div>
							</div>
							<div className="row">
								<label htmlFor="amount">Amount:</label>
								<div className="col-10">
									<input
										type="number"
										name="amount"
										placeholder="Enter an amount"
										value={transInfo.amount}
										onChange={handleTransaction}
										min="1"
									/>
									<br />
								</div>
								{/* <div class="col-90">
                                        <input type="number" id="amount" name="amount" maxlength="8" min="1" placeholder = "Enter an amount"/>
                                    </div> */}
							</div>
							<div className="row">
								<div className="col-10">
									<label htmlFor="address">Comment:</label>
								</div>

								<div className="col-90">
									<textarea name="description"
										value={transInfo.comment}
										name="comment"
										onChange={handleTransaction}
										id="description"
										cols="30" rows="10"
										placeholder="Write your comment here"></textarea>
								</div>
							</div>
							<div>
								<Button type="submit" onClick={transactionSubmit} className="createTransaction" style={{ color: "white", backgroundColor: "salmon" }}>Submit</Button>
							</div>
						</form>
					</div>
				</Col>
			</Row>
		</Container>

	)


}

export default Money;