const express = require('express')
const taskController = require('./controllers/taskController')

const router = express.Router()

//Rotas GET
router.get("/", taskController.index)
router.get("/taskList", taskController.listAll)
router.get("/newList", taskController.newList)
router.get("/newList/create/success", taskController.success)
router.get("/taskList/:id", taskController.show)

//Rotas POST
router.post("/newList/create/success", taskController.create)
router.post("/taskList/:id/addTask", taskController.addTask)
router.post("/taskList/:id/toggleComplete/:taskId", taskController.toggleComplete)
router.post("/taskList/:id/delete", taskController.deleteList)
router.post("/taskList/:id/deleteAllTasks", taskController.deleteAllTasks);
router.post("/taskList/:id/deleteTask/:taskId", taskController.deleteTask);

module.exports = router