export const filterByStatus = (status, tasks) => {
  return tasks.filter((task) => task.status === status)
}