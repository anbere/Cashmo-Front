import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap'
import NumberFormat from "react-number-format";

 const TransactionTable = () => {

    const [userTransactions, setUserTransactions] = useState([]);

    useEffect( () => {
        async function loadTransactions() {
            const temp = await JSON.parse(sessionStorage.getItem('transactions'))
            setUserTransactions(temp);
        }

        loadTransactions();
    },[sessionStorage.getItem('transactions')])

    return (
        <Container className="transactions">
           <h1 id='title'>All transactions</h1>
           <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Comment</th>
                            {/* <th>Time</th> */}
                            <th>Status</th>
                            <th>Type</th>
                            <th>Origin</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userTransactions.length > 0?
                            userTransactions.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <NumberFormat value={item.amount} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                    <td>{item.comment}</td>
                                    {/* <td>{item.time}</td> */}
                                    <td>{item.status}</td>
                                    <td>{item.type}</td>
                                    <td>{item.originUsername}</td>
                                    <td>{item.destinationUsername}</td>
                                </tr>
                            )) : <tr></tr>
                        }
                    </tbody>
                </Table>
           </Row>
           
        </Container>
     )
}

export default TransactionTable;
