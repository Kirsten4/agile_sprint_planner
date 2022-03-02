import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Row, Form } from 'react-bootstrap'

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const propertyName = event.target.name;
    const newUserCopy = { ...newUser };
    newUserCopy[propertyName] = event.target.value;
    setNewUser(newUserCopy);
  };

  const signUp = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/signup", newUser).then(
      (res) => {
        console.log(res);
        window.location = "/login";
      },
      (err) => {
        console.log(err.response);
        setError(err.response.data.error);
      }
    );
  };

  return (
    <>
      <Container className="form-container">
        <Row>
          <Form onSubmit={signUp}>
            <Form.Label className="white-label"><h2>Sign Up:</h2> </Form.Label>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="white-label">Username: </Form.Label>
              <Form.Control type="text" name="username" value={newUser.username} onChange={handleChange} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="white-label">Password: </Form.Label>
              <Form.Control type="password" name="password" value={newUser.password} onChange={handleChange} required></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </Row>
      </Container>
      <p className="white-label">{error}</p>
    </>
  );
};
export default SignUp;
