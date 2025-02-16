'use client'

import { createContext, useContext, useState } from "react";
import { updateStatusTask } from '../api/Tasks'

const TaskContext = createContext();

export const TaskProvider = ({children}) => {

  const [tasks, setTasks] = useState(null);
  const [statusHasChange, setStatusHasChange] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleTaskStatus = async (taskId) => {
    try {
      await updateStatusTask(taskId);
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        toggleTaskStatus,
        statusHasChange,
        setStatusHasChange,
        isModalOpen,
        setModalOpen
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext);
  if(!context){
    throw new Error('useTask must be used within an AuthProvider')
  }
  return context;
};
