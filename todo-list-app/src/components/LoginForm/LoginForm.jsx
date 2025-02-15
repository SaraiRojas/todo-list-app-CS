'use client'

import styles from './LoginForm.module.css'
import { useState } from 'react'
import { login } from '@/api/Auth'

export const LoginForm = () => {
  const INITIAL_STATE = {
    email: '',
    password: '',
  }

  const [inputValues, setInputValues] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    validateInputs(name, value)
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(inputValues)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const validateInputs = (field, value) => {
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    const expPassword = /.{8}/

    setErrors((prev) => ({
      ...prev,
      [field]:
        field === 'email' && !expEmail.test(value)
          ? 'Formato inválido'
          : field === 'password' && !expPassword.test(value)
            ? 'Contraseña debe de contener min 8 caracteres'
            : '',
    }))
  }

  return (
    <form className={styles.form}>
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
      <p className={`${styles.alertError}`}>{errors.password}</p>
      <button className={styles.formBtn} type="submit" onClick={handleSubmit}>
        Login
      </button>
      <p className={styles.formSignUp}>
        Not a member? <span className={styles.formLink}>Sign up</span>
      </p>
    </form>
  )
}
