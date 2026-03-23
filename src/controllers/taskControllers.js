const { tasks } = require("../data/tasks");

const getAllTasks = (req, res) => {
    if (tasks.length === 0 || !tasks) {
        return res.status(200).json([]);
    }
    res.status(200).json(tasks);
}

const getTasksById = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    res.status(200).json(task);
}

const CreateTask = (req, res) => {
    const { title, description, completed } = req.body;
    if (
        !title ||
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            message: "Invalid data"
        });
    }
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;

    const newTask = {
        id: maxId + 1,
        title,
        description,
        completed
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
}

const updateTask = (req, res) => {
    const id = Number(req.params.id);

    const { title, description, completed } = req.body;

    if (
        !title ||
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            message: "Invalid data"
        });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        description,
        completed
    };

    res.status(200).json(tasks[taskIndex]);
};

const deleteTask = (req, res) => {
    const taskId = Number(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });

}

module.exports = {
    getAllTasks,
    getTasksById,
    CreateTask,
    updateTask,
    deleteTask
};