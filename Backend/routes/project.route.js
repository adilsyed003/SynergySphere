const express = require('express');
const router = express.Router();
const { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject,
    getProjectTasks
} = require('../controllers/project.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

router.get('/:id/tasks', getProjectTasks);

module.exports = router; 