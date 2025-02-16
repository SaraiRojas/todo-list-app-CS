'use client'

import { createContext, useContext, useState } from "react";
import {login, signup} from '../api/Auth'

const TaskContext = createContext();

export const TaskProvider = ({children}) => {

  const [tasks, setTasks] = useState(null);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks
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
