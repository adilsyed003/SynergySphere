const Employee = require('../models/employee.model');
const auditLogger = require('../utils/auditLogger');

exports.createEmployee = async (req, res) => {
    try {
        const employeeData = {
            ...req.body,
            organizationId: req.organizationId
        };

        const employee = await Employee.create(employeeData);

        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'create_employee',
            status: 'success',
            details: { employeeId: employee._id, data: req.body }
        });

        res.status(201).send(employee);
    } catch (error) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'create_employee',
            status: 'failure',
            details: { error: error.message, data: req.body }
        });
        res.status(400).send({ message: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ organizationId: req.organizationId });
        res.status(200).send(employees);
    } catch (error) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'get_all_employees',
            status: 'failure',
            details: { error: error.message }
        });
        res.status(500).send(error);
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ 
            _id: req.params.id,
            organizationId: req.organizationId
        });
        
        if (!employee) {
            await auditLogger({
                organizationId: req.organizationId,
                userId: req.user.id,
                action: 'get_employee_by_id',
                status: 'failure',
                details: { employeeId: req.params.id, error: 'Not found' }
            });
            return res.status(404).send({ message: 'Employee not found' });
        }

        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'get_employee_by_id',
            status: 'success',
            details: { employeeId: req.params.id }
        });

        res.status(200).send(employee);
    } catch (error) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'get_employee_by_id',
            status: 'failure',
            details: { employeeId: req.params.id, error: error.message }
        });
        res.status(500).send(error);
    }
};

exports.updateEmployeeById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'position', 'department', 'email', 'hireDate', 'salary', 'contact', 'phone', 'address'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'update_employee',
            status: 'failure',
            details: { employeeId: req.params.id, error: 'Invalid updates', updates: req.body }
        });
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const employee = await Employee.findOne({
            _id: req.params.id,
            organizationId: req.organizationId
        });
        
        if (!employee) {
            await auditLogger({
                organizationId: req.organizationId,
                userId: req.user.id,
                action: 'update_employee',
                status: 'failure',
                details: { employeeId: req.params.id, error: 'Not found' }
            });
            return res.status(404).send({ message: 'Employee not found' });
        }

        updates.forEach((update) => (employee[update] = req.body[update]));
        await employee.save();

        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'update_employee',
            status: 'success',
            details: { employeeId: req.params.id, updates: req.body }
        });

        res.status(200).send(employee);
    } catch (error) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'update_employee',
            status: 'failure',
            details: { employeeId: req.params.id, error: error.message, updates: req.body }
        });
        res.status(400).send(error);
    }
};

exports.deleteEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({
            _id: req.params.id,
            organizationId: req.organizationId
        });
        
        if (!employee) {
            await auditLogger({
                organizationId: req.organizationId,
                userId: req.user.id,
                action: 'delete_employee',
                status: 'failure',
                details: { employeeId: req.params.id, error: 'Not found' }
            });
            return res.status(404).send({ message: 'Employee not found' });
        }

        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'delete_employee',
            status: 'success',
            details: { employeeId: req.params.id }
        });

        res.status(200).send(employee);
    } catch (error) {
        await auditLogger({
            organizationId: req.organizationId,
            userId: req.user.id,
            action: 'delete_employee',
            status: 'failure',
            details: { employeeId: req.params.id, error: error.message }
        });
        res.status(500).send(error);
    }
};