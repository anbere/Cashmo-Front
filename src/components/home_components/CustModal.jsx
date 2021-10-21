import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function CustModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter updated user info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className="App2">
                <input 
                    type="text"
                    name="username" 
                    placeholder="Username"
                    autoComplete="off" 
                />
                <br/>
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <br/>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                />
                <br/>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="off"
                />
                <br/>
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Last Name" 
                    autoComplete="off"
                />
                <br/>
                <Button
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustModal;