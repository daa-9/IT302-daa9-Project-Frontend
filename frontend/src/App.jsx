import React, { StrictMode, useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import JobsList from "./components/jobsList";
import Job from "./components/job";
import Login from "./components/login";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const App = () => {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Job Listings</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/daa9_jobs"}>Jobs</Nav.Link>
              <Nav.Link as={NavLink} to={user ? "" : "/login"}>{user ? "Logout User" : "Login"}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<JobsList />}></Route>
        <Route path="/daa9_jobs" element={<JobsList />}></Route>
        <Route path="/daa9_jobs/:id/" element={<Job user={user} />}></Route>
        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
