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

router.get('/tasks', getTasks)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)

router.patch('/tasks/:id', updateTaskStatus)

module.exports = router
