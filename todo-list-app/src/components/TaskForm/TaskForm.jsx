
"use client";

import { useState } from "react";
import styles from './TaskForm.module.css'
import { useAuth } from "../../context/AuthContext";
import { useTask } from '../../context/TaskContext'
import { createTask } from '../../api/Tasks'

export default function TaskModal({ isOpen, onClose }) {
  const [task, setTask] = useState({
    title: "",
    subtasks: [],
  });

  const { userId } = useAuth()
  const { setStatusHasChange } = useTask()

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index].title = value;
    setTask({ ...task, subtasks: updatedSubtasks });
  };

  const addSubtask = () => {
    setTask({
      ...task,
      subtasks: [...task.subtasks, { title: "" }],
    });
  };

  const removeSubtask = (index) => {
    setTask({
      ...task,
      subtasks: task.subtasks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task)
    createTask(userId, task)
      .then(() => {
        setStatusHasChange((prev) => !prev)
        setTask({
          "title": "",
          "subtasks": [],
        })
        onClose();
      }).catch((err) => console.log(err))
  };
  

  const handleOnClose = (e) => {
    setTask({
      title: "",
      subtasks: [],
    })
    onClose();
  };

  if (!isOpen) return null;

  return (
      <div className={styles.container}>
        <h2>Create Task</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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

          <div className={styles.subtasksContainer}>
            <h3 className={styles.subtasks}>Subtasks</h3>
            {task.subtasks.map((subtask, index) => (
              <div key={subtask.id}>
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className={styles.btnSubtask}
                  key={`btn-${subtask.id}`}
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
                  key={`input-${subtask.id}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSubtask}
              className={styles.btn}
            >
              + Add Subtask
            </button>
          </div>

          <div className={styles.btnContainer}>
            <button
              type="button"
              onClick={handleOnClose}
              className={styles.btn}
            >
               X Close
            </button>
            <button
              type="submit"
              className={styles.btn}
            >
              Create
            </button>
          </div>
        </form>
      </div>
  );
}