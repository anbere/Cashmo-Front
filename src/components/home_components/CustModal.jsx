import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CustModal(props) {

  const {user,update, ...others} = props

  const [newInfo, setNewInfo] = useState({
    ...user,
  });

  const handleChange = (event) => {
    setNewInfo({
        ...newInfo,
        [event.target.name]: event.target.value
    })
  }

  const handleUpdate = (event) => {
    event.preventDefault();

    //input validation

    fetch("http://localhost:8080/api/v1/user",
            {
                method: "PUT",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newInfo)
            }).then(response => response.json()
            )
            .then(body => {
                console.log("body: ", body)
                if(body.success) {
                  sessionStorage.setItem('user', JSON.stringify(newInfo))
                  alert("Update Succesful");
                  props.onHide();
                }
                else{
                    alert(body.message);
                }
            })
      }

  return (
    
    <Modal
    {...others}
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newInfo.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newInfo.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newInfo.firstName}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newInfo.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <Button
            color="primary"
            type="submit"
            onClick={handleUpdate}
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