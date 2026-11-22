/*
    Dylan Almache
    11/22/26
    IT302 Section 001
    Phase 5 C.U.D. Node.js Data using React.js Assignment
    daa9@njit.edu
*/

import { useState } from 'react'
import JobDataService from "../service/jobsDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddNotice = (props) => {
    let editing = false
    let initialNoticeState = ""
    const location = useLocation();
    if (location.state && location.state.currentNotice) {
        editing = true;
        initialNoticeState = location.state.currentNotice.notice
    }

    const [notice, setNotice] = useState(initialNoticeState)
    const [submitted, setSubmitted] = useState(false)
    let { id } = useParams();

    const onChangeNotice = e => {
        const notice = e.target.value
        setNotice(notice);
    }

    const saveNotice = () => {
        var data = {
            notice: notice,
            name: props.user.name,
            user_id: props.user.id,
            job_id: id
        }
        if (editing) {
            data.notice_id = location.state.currentNotice._id
            JobDataService.updateNotice(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })

        } else {
            JobDataService.createNotice(data)
                .then(response => {
                    setSubmitted(true)
                }).catch(e => { })
        }
    }

    return (
        <div>
            {submitted ? (
                <div>
                    <h5>Notice submitted successfully</h5>
                    <Link to={"/daa9_jobs/" + id}>
                        Back to Jobs
                    </Link>
                </div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Notice</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={notice}
                            onChange={onChangeNotice}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveNotice}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default AddNotice;

