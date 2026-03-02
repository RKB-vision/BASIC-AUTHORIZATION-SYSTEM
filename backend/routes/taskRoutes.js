const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

router.get("/task", verifyToken, taskController.getTasks);
router.post("/create", verifyToken, taskController.createTask);
router.delete('/delete/:id', verifyToken, taskController.deleteTask);
router.put("/update/:id", verifyToken, taskController.updateTask);

module.exports = router;
