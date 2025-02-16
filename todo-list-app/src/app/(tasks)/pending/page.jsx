'use client'

import TaskContainer from '../../../components/TaskContainer/TaskContainer'
import Task from '../../../components/Task/Task'
import { useEffect } from 'react'
import {getTasks} from '../../../api/Tasks'
import {useAuth} from '../../../context/AuthContext'
import { useTask } from '../../../context/TaskContext'

const pending = () => {

  const { userId } = useAuth()
  const { tasks, setTasks } = useTask()

  useEffect(()=>{
    getTasks(userId)
      .then((res => setTasks(res.data)))
      .catch((err => console.log(err)))
  },[userId])

  return tasks && (
    <TaskContainer>
      {tasks.map(task => <Task data={task} key={task._id}></Task>)}
    </TaskContainer>
  )
}

export default pending
