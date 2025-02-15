import axios from 'axios'

export const signup = async (user) => {
  const body = {
    ...user,
    username: user.email.split('@')[0],
  }
  return axios.post('http://localhost:8000/api/auth/register', body)
}

export const login = async (user) =>
  axios.post('http://localhost:8000/api/auth/login', user)
