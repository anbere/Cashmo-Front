import React from "react";
import { Container, Row, Col, Table } from 'react-bootstrap'

 const TransactionTable = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userTransactions = JSON.parse(sessionStorage.getItem('transactions'))

    // const renderTableData = () => {
    //     userTransactions.map((item) => {
    //        return (
    //           <tr key={id}>
    //              <td>{id}</td>
    //              <td>{amount}</td>
    //              <td>{comment}</td>
    //              <td>{date}</td>
    //              <td>{status}</td>
    //              <td>{type}</td>
    //           </tr>
    //        )
    //     })
    //  }

    return (
        <Container>
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
                            userTransactions.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.amount}</td>
                                    <td>{item.comment}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>{item.type}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
           </Row>
           
        </Container>
     )
}

export default TransactionTable;
