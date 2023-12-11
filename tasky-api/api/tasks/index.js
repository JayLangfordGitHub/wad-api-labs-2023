import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new task
router.post('/', (req, res) => {
    // Create a new task object with a unique ID and timestamps
    const newTask = {
        id: uuidv4(),
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    // Add the new task to the tasks array
    tasksData.tasks.push(newTask);
    
    // Send the new task back in the response
    res.status(201).json(newTask);
});

// Get task details
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    
    // Update the task and modify the updated_at timestamp
    const updatedTask = {
        ...tasksData.tasks[taskIndex],
        ...req.body,
        id: id,
        updated_at: new Date().toISOString() // Set updated_at to the current time
    };
    tasksData.tasks[taskIndex] = updatedTask;
    
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({ status: 404, message: 'Task not found' });
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});

export default router;
