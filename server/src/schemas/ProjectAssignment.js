import mongoose, { Schema } from "mongoose"

const projectAssignmentsSchema = new Schema({
  employee: { Number, ref: 'employees'},
  project: { String, ref: 'projects'},
  start_date: Date
}) 

const ProjectAssignment = mongoose.model('project_assignments', projectAssignmentsSchema)

export default ProjectAssignment
