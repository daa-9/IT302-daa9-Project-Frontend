/*
    Dylan Almache
    11/1/26
    IT302 Section 001
    Phase 4 Read Node.js Data Using React.js Assignment
    daa9@njit.edu
*/

import axios from "axios";

class JobDataService {
  getAll(page = 0) {
    return axios.get(
      `${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/id/${id}`
    );
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs?${by}=${query}&page=${page}`
    )
  }

  createNotice(data) {
    return axios.post(`${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/notice`, data)
  }

  updateNotice(data) {
    return axios.put(`${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/notice`, data)
  }

  deleteNotice(id, userId) {
    return axios.delete(
      `${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/notice`,
      { data: { notice_id: id, user_id: userId } }
    )
  }

  getNotices() {
    return axios.get(`${process.env.PUBLIC_BACKEND_URL}/api/v1/daa9/jobs/notice`)

  }
}
export default new JobDataService();
