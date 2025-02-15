import styles from './LoginForm.module.css'

export const LoginForm = () => {
  return (
    <form className={styles.form}>
      <input
        className={styles.formInput}
        type="email"
        placeholder="email"
        required
      />
      <input
        className={styles.formInput}
        type="password"
        placeholder="password"
        required
      />
      <button className={styles.formBtn} type="submit">
        Login
      </button>
      <p className={styles.formSignUp}>
        Not a member? <span className={styles.formLink}>Sign up</span>
      </p>
    </form>
  )
}
