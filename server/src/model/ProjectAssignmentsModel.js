import databaseService from '../service/DatabaseService.js'

/**
 * The ProjectAssignmentModel class provides methods to interact with the project data in the database.
 */
class ProjectAssignmentsModel{
  /**
   * Retrieves a single ProjectAssignment from the database by its ID.
   * 
   * @param {string} searchId - The ID of the ProjectAssignment to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the project object if found, or null if not found.
   */
  async getProjectAssignmentById(searchId) {
    try {
      const projectAssignment = await databaseService.collections[2].findById(searchId)
      return projectAssignment
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Adds a new project to the database.
   * 
   * @param {Object} projectData - The data of the project to add.
   * @returns {Promise<Object>} A promise that resolves to the newly created project object.
   */
  async addProjectAssignment(projectAssignmentData) {
    try {
      const newProjectAssignment = await databaseService.collections[2].create(projectAssignmentData)
      return newProjectAssignment
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Retrieves all projectAssignments from the database and populates the related employee and project data.
   * 
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of populated project assignment objects.
   */
  async getProjectAssignments() {
    try {
      const projectAssignments = await databaseService.collections[2]
        .find() 
        .populate('employee')
        .populate('project')
      return projectAssignments
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ProjectAssignmentsModel()
