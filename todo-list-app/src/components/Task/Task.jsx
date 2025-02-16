import styles from './Task.module.css'
import { useTask } from '../../context/TaskContext';
import { useState } from 'react';
import { deleTask } from '../../api/Tasks'
import Image from 'next/image'

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

  const handleDelete = () => {
    deleTask(data._id)
      .then(() => {
        setStatusHasChange((prev) => !prev);
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <article className={styles.article}>
      <input type="checkbox" className={styles.checkbox} checked={isChecked} onChange={handleOnChange}></input>
      <h1 className={styles.title}>{data.title}</h1>
      <button className={styles.btn} onClick={handleDelete}>
        <Image
          className={styles.logo}
          src="/trash-can.svg"
          alt="trash btn"
          width={30}
          height={30}
        />
      </button>
    </article>
  )
}

export default Task
