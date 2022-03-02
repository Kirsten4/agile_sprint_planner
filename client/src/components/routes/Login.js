import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Button, Container, Row, Form } from 'react-bootstrap'

const Login = ({fetchCurrentUser}) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  const handleChange = (event) => {
    const copiedUser = { ...user };
    const propertyName = event.target.name;
    copiedUser[propertyName] = event.target.value;
    setUser(copiedUser);
  };

  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/login", user)
    .then(res => {
        if (res.status === 200){
            localStorage.setItem('token', res.data.token)
            fetchCurrentUser(user)
            }
    }, err => {console.log(err.response);
    setError(err.response.data.error);}    
    );
  };

  return (
      <Container className="form-container">
            <Row>
                <Form onSubmit={login}>
                <Form.Label className="white-label"><h2>Login:</h2> </Form.Label>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label className="white-label">Username: </Form.Label>
                        <Form.Control type="text" name="username" value={user.username} onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="white-label">Password: </Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </Row>
                </Container>
  );
};
export default Login;