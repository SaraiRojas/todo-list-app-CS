'use client'

import styles from './LoginForm.module.css'
import { useState } from 'react'
import { login, signup } from '../../api/Auth'
import Link from 'next/link'

const LoginForm = ({ type }) => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '', submit: '' })

  const api = {
    login,
    signup,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    validateInputs(name, value)
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api[type](inputValues)
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: 'Invalid credentials',
      }))
    }
  }

  const validateInputs = (field, value) => {
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    const expPassword = /.{8}/

    setErrors((prev) => ({
      ...prev,
      [field]:
        field === 'email' && !expEmail.test(value)
          ? 'Enter a valid email'
          : field === 'password' && !expPassword.test(value)
            ? 'Password must contain at least 8 characters'
            : '',
    }))
  }

  const message = {
    login: ['Login', 'Not a member? ', 'Sign up'],
    signup: ['Sign up', 'Already a member? ', 'Login'],
  }

  const linkURLs = {
    login: '/signup',
    signup: '/login',
  }

  return (
    <form className={styles.form}>
      {type === 'signup' && (
        <h2 className={styles.signupTitle}>Create account</h2>
      )}
      <input
        className={styles.formInput}
        name="email"
        type="email"
        value={inputValues.email}
        onChange={handleChange}
        placeholder="email"
        required
      />
      <span className={`${styles.alertError}`}>{errors.email}</span>
      <input
        className={styles.formInput}
        type="password"
        name="password"
        value={inputValues.password}
        onChange={handleChange}
        placeholder="password"
        required
      />
      <span className={`${styles.alertError}`}>
        {errors.password || errors.submit}
      </span>
      <button className={styles.formBtn} type="submit" onClick={handleSubmit}>
        {message[type][0]}
      </button>
      <p className={styles.formSignUp}>
        {message[type][1]}
        <Link href={linkURLs[type]} className={styles.formLink}>
          {message[type][2]}
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
