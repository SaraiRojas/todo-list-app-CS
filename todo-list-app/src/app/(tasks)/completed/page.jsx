'use client'

import TaskContainer from '../../../components/TaskContainer/TaskContainer'
import Task from '../../../components/Task/Task'
import { useTask } from '../../../context/TaskContext'
import { useAuth } from '../../../context/AuthContext'
import {filterByStatus} from '../../../utils/filterByStatus'
import { useEffect } from 'react'
import {getTasks} from '../../../api/Tasks'

const completed = () => {

  const { userId } = useAuth()
  const { setTasks, tasks, statusHasChange } = useTask()

  useEffect(()=>{
    getTasks(userId)
      .then((res => setTasks(res.data)))
      .catch((err => console.log(err)))
  },[userId, statusHasChange])

  return tasks && (
    <TaskContainer>
      {filterByStatus('completada', tasks).map(task => <Task data={task} key={task._id}></Task>)}
    </TaskContainer>
  )
}

export default completed
