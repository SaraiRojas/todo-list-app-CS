import styles from './Task.module.css'
import { useTask } from '../../context/TaskContext';
import { useState } from 'react';

const Task = ({ data }) => {
  console.log(data)

  const [isChecked, setIsChecked] = useState(data.status === 'completada');

  const {toggleTaskStatus, setStatusHasChange} = useTask();

  const handleOnChange = () => {
    toggleTaskStatus(data._id)
      .then(() => {
        setIsChecked(!isChecked)
        setStatusHasChange((prev) => !prev);
      }).catch(() => {
        alert('Task has pending subtasks')
      })
  }

  return (
    <article className={styles.article}>
      <input type="checkbox" className={styles.checkbox} checked={isChecked} onChange={handleOnChange}></input>
      <h1 className={styles.title}>{data.title}</h1>
    </article>
  )
}

export default Task
