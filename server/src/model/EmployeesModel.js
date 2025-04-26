import databaseService from '../service/DatabaseService.js'

/**
 * The EmployeeModel class provides methods to interact with the employee data in the database.
 */
class EmployeesModel{
  /**
     * Retrieves a single Employee from the database by its Full Name.
     * 
     * @param {string} fullName - The full name of the Employee to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the employee object if found, or null if not found.
     */
  async getEmployeeByFullName(fullName) {
    try {
      const employee = await databaseService.collections[0].findOne({ full_name: fullName })
      return employee
    } catch (error) {
      console.log(error)
    }
  }

  /**
     * Adds a new employee to the database.
     * 
     * @param {Object} employeeData - The data of the employee to add.
     * @returns {Promise<Object>} A promise that resolves to the newly created employee object.
     */
  async addEmployee(employeeData) {
    try {
      const newEmployee = await databaseService.collections[0].create(employeeData)
      return newEmployee
    } catch (error) {
      console.log(error)
    }
  }
}

export default new EmployeesModel()
