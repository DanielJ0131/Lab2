import express from 'express'
import controller from '../controller/ProjectsController.js'

export const router = express.Router()

router.post('/projects', (req, res, next) => controller.addProject(req, res, next))
