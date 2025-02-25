import axios from 'axios'

export const getTasks = (userId) =>
  axios({
    method: 'get',
    url: `http://localhost:8000/api/tasks?userId=${userId}`,
    responseType: 'json',
  }).then((data) => data)

export const createTask = (userId, body) => {
  return axios.post(`http://localhost:8000/api/tasks?userId=${userId}`, body)
}

export const deleTask = (id) => {
  return axios.delete(`http://localhost:8000/api/tasks/${id}`)
}

export const updateStatusTask = (taskId) =>
  axios({
    method: 'patch',
    url: `http://localhost:8000/api/tasks/${taskId}`,
    responseType: 'json',
  }).then((data) => data)
