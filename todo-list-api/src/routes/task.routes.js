const { Router } = require('express')
const auth = require('../middlewares/auth.middleware.js')
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} = require('../controllers/task.controller.js')

const router = Router()

router.get('/tasks', auth, getTasks)

router.get('/tasks/:id', auth, getTask)

router.post('/tasks', auth, createTask)

router.delete('/tasks/:id', auth, deleteTask)

router.put('/tasks/:id', auth, updateTask)

router.patch('/tasks/:id', auth, updateTaskStatus)

module.exports = router
