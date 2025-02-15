import Header from '../../components/Header/Header'
import styles from './layout.module.css'
import AddTaskBtn from '../../components/AddTaskBtn/AddTaskBtn'
import NavBar from '../../components/NavBar/NavBar'

export default function RootLayout({ children }) {
  return (
    <main className={styles.main}>
      <Header></Header>
      <section className={styles.section}>
        <h1 className={styles.Title}>My Tasks</h1>
        <AddTaskBtn></AddTaskBtn>
      </section>
      <NavBar></NavBar>
      {children}
    </main>
  )
}
