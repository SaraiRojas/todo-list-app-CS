import axios from 'axios'

export const getTasks = () =>
  axios({
    method: 'get',
    url: 'http://localhost:8000/api/tasks',
    responseType: 'json',
  }).then((data) => data)

export const getTask = () => {}

export const createTask = () => {}

export const deleTask = () => {}

export const updateTask = () => {}

export const updateStatusTask = () => {}

export const updateStatusSubTask = () => {}
