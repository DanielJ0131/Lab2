import employeesModel from '../model/EmployeesModel.js'
import bcrypt from 'bcrypt'
/**
 * Controller to perform CRUD for the employee collection.
 *
 * @class
 */
class EmployeesController {
  /**
     * Add a new employee.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async addEmployee(req, res, next) {
    try {
      const newEmployee = req.body
      const existingEmployee = await employeesModel.getEmployeeByFullName(newEmployee.full_name)
      if (existingEmployee) {
        return res.status(409).json({ message: 'Employee already exists' })
      }
      newEmployee.password = await bcrypt.hash(newEmployee.password, 10)
      newEmployee.hashed_password = newEmployee.password
      delete newEmployee.password
      const createdEmployee = await employeesModel.addEmployee(newEmployee)
          
      if (!createdEmployee) {
        return res.status(400).json({ message: 'Failed to create employee' })
      }

      res.status(201).json(createdEmployee)
    } catch (error) {
      next(error)
    }
  }
}

export default new EmployeesController()
