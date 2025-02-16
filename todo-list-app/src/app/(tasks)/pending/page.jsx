'use client'

import TaskContainer from '../../../components/TaskContainer/TaskContainer'
import Task from '../../../components/Task/Task'
import { useEffect } from 'react'
import {getTasks} from '../../../api/Tasks'

const pending = () => {

  useEffect(()=>{
    getTasks()
      .then((res => console.log(res)))
      .catch((err => console.log(err)))
  },[])

  return (
    <TaskContainer>
      <Task></Task>
    </TaskContainer>
  )
}

export default pending
