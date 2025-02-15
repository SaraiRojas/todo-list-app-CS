import { LoginForm } from '@/components/LoginForm/LoginForm'
import styles from './page.module.css'

export default async function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Todo List</h1>
        <LoginForm></LoginForm>
      </div>
    </main>
  )
}
