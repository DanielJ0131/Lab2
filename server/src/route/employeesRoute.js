import express from 'express'
import controller from '../controller/EmployeesController.js'

export const router = express.Router()

router.post('/employees', (req, res, next) => controller.addEmployee(req, res, next))
