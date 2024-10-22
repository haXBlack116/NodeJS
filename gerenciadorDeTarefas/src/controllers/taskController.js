const taskModel = require("../models/taskModel")

const taskController = {

    //GET /
    index: (req, res) => {
        res.render("index")
    },

    // GET /taskList
    listAll: (req, res) => {
    const tasksList = taskModel.getAllTasks()
    res.render('taskList', { tasksList })
    },


    //GET /newList
    newList: (req, res) => {
        res.render("newList")
    },

    //GET /newList/create/success
    success: (req, res) => {
        res.render("success")
    },

    // GET /taskList/:id
    show: (req, res) => {
    const id = req.params.id;
    const taskList = taskModel.getTaskById(id);

    if (taskList) {
        res.render('singleTaskList', { taskList });
    } else {
        res.status(404).send('Lista de Tarefas não encontrada');
    }
},

    toggleComplete: (req, res) => {
    const { id, taskId } = req.params;
    taskModel.toggleTaskComplete(id, taskId); // Passando id e taskId corretamente
    res.redirect(`/taskList/${id}`);
},

    // POST /newList/create/success
    create: (req, res) => {
    const { taskTitle } = req.body
    if (taskTitle) {
        taskModel.createTaskList(taskTitle) 
        res.redirect("success")
    } else {
        res.status(400).send("Preencha todos os campos!") 
    }
},

    deleteList: (req, res) => {
    const id = req.params.id; // Este 'id' é o id da lista
    taskModel.deleteTaskList(id); // Chama o método de deleção
    res.redirect("/taskList");
},


    // POST /taskList/:id/addTask
    addTask: (req, res) => {
    const id = req.params.id
    const { taskTitle } = req.body

    if (taskTitle) {
        taskModel.addTask(id, taskTitle) 
        res.redirect(`/taskList/${id}`)
    } else {
        res.status(400).send("O título da tarefa não pode ser vazio!")
    }
},

    // POST /taskList/:id/delete
    deleteList: (req, res) => {
    const id = req.params.id; // Este 'id' é o id da lista
    taskModel.deleteTaskList(id); // Chama o método de deleção
    res.redirect("/taskList");
},

    // POST /taskList/:id/deleteAllTasks
    deleteAllTasks: (req, res) => {
    const id = req.params.id; // Este 'id' é o id da lista
    taskModel.deleteAllTasks(id); // Chama o método de deleção
    res.redirect(`/taskList/${id}`);
},

    // POST /taskList/:id/deleteTask/:taskId
    deleteTask: (req, res) => {
    const { id, taskId } = req.params;
    taskModel.deleteTask(id, taskId); // Chama o método de deleção
    res.redirect(`/taskList/${id}`);
}

    


}

module.exports = taskController