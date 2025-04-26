import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Employee from '../schemas/Employee.js'
import Project from '../schemas/Project.js'
import ProjectAssignment from '../schemas/ProjectAssignment.js'
import { config } from '../config/database.js'

/**
 * Service (singleton) to manage database operations.
 *
 * @class
 */
class DatabaseService {
  #db = null
  collections = []

  async connect() {
    console.log('Trying to Connect to Database...')
    try {
      this.#db = await mongoose.connect(config.url)

      if (!this.#db) {
        console.error('Failed to connect to the database.')
        return
      }
      this.collections = [Employee, Project, ProjectAssignment]
      console.log('Connection Successful!')
    } catch (error) {
      console.log('Error with connection: ' + error)
    }
  }

  async closeConnection() {
    if (this.#db) {
      try {
        await mongoose.disconnect()
        console.log('Database connection terminated.')
        
      } catch (error) {
        console.log('Error while disconnecting: ' + error)
      }
    }
  }

  // Sample Documents
  async createSampleData() {
    try {
      // Delete existing data if it exists
      await this.collections[0].deleteMany()
      await this.collections[1].deleteMany()
      await this.collections[2].deleteMany()
      console.log('Deleted existing data.')
    } catch (error) {
      console.error('Error deleting existing data:', error)
    }

    const plainPasswords = ['hardPassword1', 'hardPassword2', 'hardPassword3', 'hardPassword4', 'hardPassword5']
    const hashedPasswords = await Promise.all(
      plainPasswords.map(p => bcrypt.hash(p, 10))
    )

    try {
      // Employees
      const employees = await this.collections[0].insertMany([
        { employee_id: 1, full_name: 'Lara Croft', email: 'lara.croft@adventure.com', hashed_password: hashedPasswords[0] },
        { employee_id: 2, full_name: 'Tony Stark', email: 'tony.stark@starkindustries.com', hashed_password: hashedPasswords[1] },
        { employee_id: 3, full_name: 'Bruce Wayne', email: 'bruce.wayne@wayneenterprises.com', hashed_password: hashedPasswords[2] },
        { employee_id: 4, full_name: 'Clark Kent', email: 'clark.kent@dailyplanet.com', hashed_password: hashedPasswords[3] },
        { employee_id: 5, full_name: 'Diana Prince', email: 'diana.prince@themyscira.com', hashed_password: hashedPasswords[4] },
      ])

      // Projects
      const projects = await this.collections[1].insertMany([
        { project_code: 1, project_name: 'Project Azeroth', project_description: 'A project to explore the world of Azeroth.' },
        { project_code: 2, project_name: 'Project Outland', project_description: 'A mission to study the shattered realm of Outland.' },
        { project_code: 3, project_name: 'Project Northrend', project_description: 'An expedition to the icy continent of Northrend.' },
        { project_code: 4, project_name: 'Project Pandaria', project_description: 'A research initiative on the mysteries of Pandaria.' },
        { project_code: 5, project_name: 'Project Shadowlands', project_description: 'A deep dive into the enigmatic Shadowlands.' },
      ])

      // Project Assignments - Uses Employees and Projects
      await this.collections[2].insertMany([
        { employee: employees[0]._id, project: projects[0]._id, start_date: new Date('2023-01-01') },
        { employee: employees[1]._id, project: projects[1]._id, start_date: new Date('2023-02-01') },
        { employee: employees[2]._id, project: projects[2]._id, start_date: new Date('2023-03-01') },
        { employee: employees[3]._id, project: projects[3]._id, start_date: new Date('2023-04-01') },
        { employee: employees[4]._id, project: projects[4]._id, start_date: new Date('2023-05-01') },
      ])

      console.log('Sample data created.')
    } catch (error) {
      console.error('Error creating sample data:', error)
    }
  }
}

export default new DatabaseService()
