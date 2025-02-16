import styles from './layout.module.css'

export default function RootLayout({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Todo List</h1>
        {children}
      </div>
    </main>
  )
}
