const express = require("express");
const router = express.Router();
const { getAllTasks, getTasksById, CreateTask, updateTask, deleteTask } = require("../controllers/taskControllers");

router.get("/", getAllTasks);
router.get("/:id", getTasksById);
router.post("/", CreateTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;