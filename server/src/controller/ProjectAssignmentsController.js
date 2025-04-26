import projectAssignmentsModel from '../model/ProjectAssignmentsModel.js'
/**
 * Controller to perform CRUD for the projectAssignments collection.
 *
 * @class
 */
class ProjectAssignmentsController {
  /**
     * Add a new project.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async addProjectAssignment(req, res, next) {
    try {
      const newProjectAssignment = req.body
      const createdProjectAssignment = await projectAssignmentsModel.addProjectAssignment(newProjectAssignment)
      
      if (!createdProjectAssignment) {
        return res.status(400).json({ message: 'Failed to create project assignment' })
      }

      res.status(201).json(createdProjectAssignment)
    } catch (error) {
      next(error)
    }
  }

  async getProjectAssignments(req, res, next) {
    try {
      const projectAssignments = await projectAssignmentsModel.getProjectAssignments()
      res.status(200).json(projectAssignments)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProjectAssignmentsController()
