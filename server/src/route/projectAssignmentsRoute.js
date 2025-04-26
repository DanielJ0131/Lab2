import express from 'express'
import controller from '../controller/ProjectAssignmentsController.js'

export const router = express.Router()

router.post('/project_assignments', (req, res, next) => controller.addProjectAssignment(req, res, next))
router.get('/project_assignments', (req, res, next) => controller.getProjectAssignments(req, res, next))
