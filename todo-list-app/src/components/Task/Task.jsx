import styles from './Task.module.css'

const Task = ({ data }) => {
  console.log(data)
  return (
    <article className={styles.article}>
      <input type="checkbox" className={styles.checkbox}></input>
      <h1 className={styles.title}>Buy books</h1>
    </article>
  )
}

export default Task
