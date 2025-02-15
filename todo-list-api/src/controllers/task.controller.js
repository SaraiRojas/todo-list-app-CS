const Task = require('../models/task.model.js')

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).populate('userId')
    res.json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    return res.json(task)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createTask = async (req, res) => {
  try {
    const { title, subtasks } = req.body
    const newTask = new Task({
      title,
      subtasks,
      userId: req.user.id,
    })
    await newTask.save()
    res.json(newTask)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { title, subtasks } = req.body
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, subtasks },
      { new: true },
    )
    return res.json(taskUpdated)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    const hasPendingSubtasks = task.subtasks.some(
      (subtask) => subtask.status === 'pendiente',
    )

    if (task.status === 'pendiente' && hasPendingSubtasks) {
      return res
        .status(400)
        .json({ message: 'Task cannot be completed some subtasks are pending' })
    }

    const status = task.status === 'pendiente' ? 'completada' : 'pendiente'

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { status: status },
      { new: true },
    )

    return res.json(taskUpdated)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
}
