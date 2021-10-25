import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap'

 const TransactionTable = () => {

    const [userTransactions, setUserTransactions] = useState([]);

    useEffect( () => {
        async function loadTransactions() {
            const temp = await JSON.parse(sessionStorage.getItem('transactions'))
            setUserTransactions(temp);
        }

        loadTransactions();
    },[])

    return (
        <Container className="transactions">
           <h1 id='title'>Transactions</h1>
           <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userTransactions?
                            userTransactions.length > 0?
                            userTransactions.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.amount}</td>
                                    <td>{item.comment}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>{item.type}</td>
                                </tr>
                            )) : <tr></tr> : <tr/>
                        }
                    </tbody>
                </Table>
           </Row>
           
        </Container>
     )
}

export default TransactionTable;
