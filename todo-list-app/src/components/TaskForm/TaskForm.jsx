'use client'

import { useState } from 'react'
import styles from './TaskForm.module.css'
import { useAuth } from '../../context/AuthContext'
import { useTask } from '../../context/TaskContext'
import { createTask } from '../../api/Tasks'
import { v4 as uuidv4 } from 'uuid';
export default function TaskModal({ isOpen, onClose }) {
  const [task, setTask] = useState({
    title: '',
    subtasks: [],
  })

  const { userId } = useAuth()
  const { setTasks } = useTask()

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...task.subtasks]
    updatedSubtasks[index].title = value
    setTask({ ...task, subtasks: updatedSubtasks })
  }

  const addSubtask = () => {
    setTask({
      ...task,
      subtasks: [...task.subtasks, { title: '' }],
    })
  }

  const removeSubtask = (index) => {
    setTask({
      ...task,
      subtasks: task.subtasks.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(userId, task)
      .then((res) => {
        setTasks((prev) => {
          const _tasks = [...prev]
          _tasks.push(res.data)

          return _tasks
        })
        setTask({
          title: '',
          subtasks: [],
        })
        onClose()
      })
      .catch((err) => console.log(err))
  }

  const handleOnClose = (e) => {
    setTask({
      title: '',
      subtasks: [],
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.outsideContainer}>
       <div className={styles.container}>
        <div className={styles.taskHeader}>
          <button type="button" onClick={handleOnClose} className={styles.closeBtn}>
            x
          </button>
          <h2 className={styles.taskTitle}>Create Task</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.mainFields}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <textarea
              name="comments"
              placeholder="Comments"
              value={task.comments}
              className={styles.textArea}
            />
          </div>

          <div className={styles.subtasksContainer}>
            <div className={styles.subtasksHeader}>
              <h3 className={styles.subtasksTitle}>Subtasks</h3>
              <button type="button" onClick={addSubtask} className={`${styles.btn} ${styles.addBtn}`}>
                + Add
              </button>
            </div>
            <div className={styles.subtasksList}>
              {task.subtasks.map((subtask, index) => (
                <div key={uuidv4()} className={styles.subTask}>
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className={styles.deleteBtn}
                    key={`btn-${uuidv4()}`}
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Subtask Title"
                    value={subtask.title}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    className={styles.input}
                    required
                    key={`input-${uuidv4()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className={`${styles.btn} ${styles.createBtn}`}>
            Create task
          </button>

        </form>
      </div>
    </div>
  )
}
