'use client'

import TaskContainer from '../../../components/TaskContainer/TaskContainer'
import Task from '../../../components/Task/Task'
import { useTask } from '../../../context/TaskContext'
import { filterByStatus } from '../../../utils/filterByStatus'

const completed = () => {
  const { tasks } = useTask()

  return (
    tasks && (
      <TaskContainer>
        {filterByStatus('completada', tasks).map((task) => (
          <Task data={task} key={task._id}></Task>
        ))}
      </TaskContainer>
    )
  )
}

export default completed
