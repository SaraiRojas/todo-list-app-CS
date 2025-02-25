'use client'

import Header from '../../components/Header/Header'
import styles from './layout.module.css'
import AddTaskBtn from '../../components/AddTaskBtn/AddTaskBtn'
import NavBar from '../../components/NavBar/NavBar'
import TaskModal from '../../components/TaskForm/TaskForm'
import { useTask } from '../../context/TaskContext'

export default function RootLayout({ children }) {
  const { isModalOpen, setModalOpen } = useTask()

  return (
    <main className={styles.main}>
      <Header></Header>
      <section className={styles.section}>
        <h1 className={styles.Title}>My Tasks</h1>
        <AddTaskBtn></AddTaskBtn>
      </section>
      <NavBar></NavBar>
      {children}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></TaskModal>
    </main>
  )
}
