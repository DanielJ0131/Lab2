import projectsModel from '../model/ProjectsModel.js'
/**
 * Controller to perform CRUD for the projects collection.
 *
 * @class
 */
class ProjectsController {
  /**
     * Add a new project.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async addProject(req, res, next) {
    try {
      const newProject = req.body
      const existingProject = await projectsModel.getProjectByProjectCode(newProject.project_code)
      if (existingProject) {
        return res.status(409).json({ message: 'Project already exists' })
      }
      const createdProject = await projectsModel.addProject(newProject)
      
      if (!createdProject) {
        return res.status(400).json({ message: 'Failed to create project' })
      }

      res.status(201).json(createdProject)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProjectsController()
