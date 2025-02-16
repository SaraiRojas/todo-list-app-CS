import styles from './Task.module.css'

const Task = ({ data }) => {

  const isChecked = data.status === 'completada';

  return (
    <article className={styles.article}>
      <input type="checkbox" className={styles.checkbox} checked={isChecked}></input>
      <h1 className={styles.title}>{data.title}</h1>
    </article>
  )
}

export default Task
