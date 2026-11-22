/*
    Dylan Almache
    11/21/26
    IT302 Section 001
    Phase 5 C.U.D. Node.js Data using React.js Assignment
    daa9@njit.edu
*/

import { useState, useEffect } from 'react'
import JobDataService from '../service/jobsDataService'
import { Link, useParams } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Job = (props) => {

    const [job, setJob] = useState({
        id: null,
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        jobLevel: "",
        companyLogo: "",
        notices: []
    })

    let { id } = useParams();

    const getJob = id => {
        JobDataService.get(id)
            .then(response => {
                setJob(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getJob(id)
    }, [id])

    const deleteNotice = (noticeId, index) => {
        JobDataService.deleteNotice(noticeId, props.user.id)
            .then(response => {
                setJob((prevState) => {
                    prevState.notices.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        {job.companyLogo && (
                            <Image src={job.companyLogo} fluid />
                        )}
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{job.jobTitle}</Card.Header>
                            <Card.Body>
                                <Card.Subtitle>
                                    {job.companyName} | {job.jobLevel}
                                </Card.Subtitle>
                                <Card.Text>
                                    {job.jobDescription || job.jobExcerpt}
                                </Card.Text>
                                {props.user &&
                                    <Link to={"/daa9_jobs/" + id + "/notice"}>
                                        Add Notice
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Notices</h2><br></br>
                        {job.notices && job.notices.map((notice, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{notice.name + " left a notice on " + new Date(Date.parse(notice.date)).toDateString()}</h5>
                                        <p>{notice.notice}</p>
                                        {props.user && props.user.id === notice.user_id &&
                                            <Row>
                                                <Col><Link
                                                    to={"/daa9_jobs/" + id + "/notice"}
                                                    state={{ currentNotice: notice }}
                                                >Edit</Link>
                                                </Col>
                                                <Col><Button variant="link" onClick={() => deleteNotice(notice._id, index)}>Delete</Button></Col>
                                            </Row>}
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Job;
