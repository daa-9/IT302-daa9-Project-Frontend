/*
    Dylan Almache
    11/21/26
    IT302 Section 001
    Phase 5 C.U.D. Node.js Data using React.js Assignment
    daa9@njit.edu
*/

import { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddNotice from "./components/addNotice";
import JobsList from "./components/jobsList";
import Job from "./components/job";
import Login from "./components/login";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Job Listings</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/daa9_jobs"}>Jobs</Nav.Link>
              <Nav.Link as={NavLink} to={user ? "" : "/login"} onClick={user ? () => loginSetter(null) : undefined}>{user ? "Logout User" : "Login"}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<JobsList />}></Route>
        <Route path="/daa9_jobs" element={<JobsList />}></Route>
        <Route path="/daa9_jobs/:id/" element={<Job user={user} />}></Route>
        <Route
          path="/daa9_jobs/:id/notice"
          element={<AddNotice user={user} />}
        ></Route>
        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
