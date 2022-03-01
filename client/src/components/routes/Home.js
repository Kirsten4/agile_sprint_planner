import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProjectContainer from "../../containers/ProjectContainer";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../../App.css';

const Home = () => {

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  return (
    
    <Container>
      <Row className="header">
        <Col xs lg={true}>
        </Col>
        <Col xs="auto">
        <h1>Agile Sprint Planner</h1>
        </Col>
        <Col xs lg={true}>
        <Button variant="info" size="lg" onClick={logout}>Logout</Button>
        </Col> 
      </Row>
      <Row>
      <ProjectContainer />
      </Row>
    </Container>
  );
};
export default Home;