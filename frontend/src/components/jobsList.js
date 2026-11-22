/*
    Dylan Almache
    11/22/26
    IT302 Section 001
    Phase 5 C.U.D. Node.js Data using React.js Assignment
    daa9@njit.edu
*/

import { useState, useEffect } from 'react'
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
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("")

  useEffect(() => {
    retrieveJobs();
    retrieveJobLevels();
  }, []);

  useEffect(() => {
    setCurrentPage(0)
  }, [currentSearchMode])

  useEffect(() => {
    retrieveNextPage()
  }, [currentPage])

  const retrieveJobs = () => {
    setCurrentSearchMode("")
    JobDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setJobs(response.data.jobs);
        setCurrentPage(response.data.page)
        setEntriesPerPage(response.data.entries_per_page)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveJobLevels = () => {
    JobDataService.getJobLevels()
      .then((response) => {
        console.log(response.data);
        setJobLevels(["All Job Levels"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
    };

  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") {
      findByTitle()
    } else if (currentSearchMode === "findByJobLevel") {
      findByJobLevel()
    } else {
      retrieveJobs()
    }
  }

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  };

  const onChangeSearchJobLevel = (e) => {
    const searchJobLevel = e.target.value;
    setSearchJobLevel(searchJobLevel);
  };

  const find = (query, by) => {
    JobDataService.find(query, by, currentPage)
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
      setCurrentSearchMode("findByTitle")
      find(searchTitle, "jobTitle")
    }

  const findByJobLevel =
    () => {
      setSearchTitle("")
      setCurrentSearchMode("findByJobLevel")
      if (searchJobLevel === "All Job Levels") {
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
                  placeholder="Search by job title"
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
        <br />
        Showing Page: {currentPage}
        <Button
          variant="link"
          onClick={() => { setCurrentPage(currentPage + 1) }} >
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>
  );
}
export default JobsList;
