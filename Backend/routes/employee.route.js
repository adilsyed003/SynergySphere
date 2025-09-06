const express = require('express');
const employeeController = require('../controllers/employee.controller');

const employeerouter = express.Router();


employeerouter.post('/', employeeController.createEmployee);
employeerouter.get('/', employeeController.getAllEmployees);
employeerouter.get('/:id', employeeController.getEmployeeById);
employeerouter.patch('/:id', employeeController.updateEmployeeById);
employeerouter.delete('/:id', employeeController.deleteEmployeeById);

module.exports = employeerouter