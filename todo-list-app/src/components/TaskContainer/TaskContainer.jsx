import styles from './TaskContainer.module.css'

const TaskContainer = ({ children }) => {
  return <section className={styles.container}>{children}</section>
}

export default TaskContainer
