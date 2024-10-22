const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

function readTasksFromFile() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo de tarefas:', err);
        return [];
    }
}

function writeTasksToFile(tasksList) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasksList, null, 2), 'utf8');
    } catch (err) {
        console.error('Erro ao salvar o arquivo de tarefas:', err);
    }
}

let tasksList = readTasksFromFile();

const taskModel = {
    getAllTasks() {
        return tasksList;
    },

    getTaskById(id) {
        return tasksList.find(taskList => taskList.id === id);
    },

    createTaskList(title) {
        const newTaskList = {
            id: Date.now().toString(),
            title: title,
            tasks: []
        };
        tasksList.push(newTaskList);
        writeTasksToFile(tasksList); // Salva no arquivo após criar nova lista
    },

    addTask(id, taskTitle) {
        const taskList = this.getTaskById(id);
        if (taskList) {
            taskList.tasks.push({
                taskId: Date.now().toString(),
                content: taskTitle,
                completed: false
            });
            writeTasksToFile(tasksList); // Salva no arquivo após adicionar tarefa
        }
    },

    toggleTaskComplete(id, taskId) {
        const taskList = this.getTaskById(id);
        if (taskList) {
            const task = taskList.tasks.find(t => t.taskId === taskId);
            if (task) {
                task.completed = !task.completed; // Alterna o estado da tarefa
                writeTasksToFile(tasksList); // Salva no arquivo após alterar a tarefa
            }
        }
    },
    
    deleteTaskList(id) {
        // Filtra para excluir a lista de tarefas com o ID correspondente
        tasksList = tasksList.filter(taskList => taskList.id !== id);
        // Salva as mudanças no arquivo
        writeTasksToFile(tasksList);
    },
    
    deleteTask(id, taskId) {
        const taskList = this.getTaskById(id);
        if (taskList) {
            taskList.tasks = taskList.tasks.filter(task => task.taskId !== taskId);
            writeTasksToFile(tasksList); // Salva no arquivo após excluir tarefa
        }
    },

    deleteAllTasks(id) {
        const taskList = this.getTaskById(id);
        if (taskList) {
            taskList.tasks = [];
            writeTasksToFile(tasksList); // Salva no arquivo após excluir todas as tarefas
        }
    }
};

module.exports = taskModel;

