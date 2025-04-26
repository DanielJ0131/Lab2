import databaseService from '../service/DatabaseService.js'

/**
 * The ProjectModel class provides methods to interact with the project data in the database.
 */
class ProjectsModel{
  /**
     * Retrieves a single Project from the database by its project code.
     * 
     * @param {number} projectCode - The Project Code of the Project to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the project object if found, or null if not found.
     */
  async getProjectByProjectCode(searchId) {
    try {
      const project = await databaseService.collections[1].findOne({ project_code: searchId })
      return project
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
  async addProject(projectData) {
    try {
      const newProject = await databaseService.collections[1].create(projectData)
      return newProject
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ProjectsModel()
