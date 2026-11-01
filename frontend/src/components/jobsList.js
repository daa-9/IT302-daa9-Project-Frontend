/*
    Dylan Almache
    11/1/26
    IT302 Section 001
    Phase 4 Read Node.js Data Using React.js Assignment
    daa9@njit.edu
*/

import React, { useState, useEffect } from 'react'
import JobDataService from "../service/jobsDataService"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchJobLevel, setSearchJobLevel] = useState("");
  const [jobLevels, setJobLevels] = useState(["All Job Levels"]);

  useEffect(() => {
    retrieveJobs();
  }, []);

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setJobs(response.data.jobs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  };

  const onChangeSearchJobLevel = (e) => {
    const searchJobLevel = e.target.value;
    setSearchJobLevel(searchJobLevel);
  };

  const find = (query, by) => {
    JobDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setJobs(response.data.jobs)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findByTitle =
    () => {
      setSearchJobLevel("")
      find(searchTitle, "jobTitle")
    }

  const findByJobLevel =
    () => {
      setSearchTitle("")
      if (searchJobLevel === "All Notices") {
        retrieveJobs()
      } else {
        find(searchJobLevel, "jobLevel")
      }
    }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={onChangeSearchJobLevel}
                  value={searchJobLevel}
                >
                  {jobLevels.map((level, index) => {
                    return (
                      <option key={index} value={level}>{level}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByJobLevel}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {jobs.map((job) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={job.companyLogo} />
                  <Card.Body>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    <Card.Subtitle>
                      {job.companyName}
                    </Card.Subtitle>
                    <Card.Text>
                      {job.jobExcerpt}
                    </Card.Text>
                    <Link to={'/daa9_jobs/' + job.id} >View Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}
export default JobsList;
