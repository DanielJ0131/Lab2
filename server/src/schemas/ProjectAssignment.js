import mongoose, { Schema } from "mongoose"

const projectAssignmentsSchema = new Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employees'},
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects'},
  start_date: Date
}) 

const ProjectAssignment = mongoose.model('project_assignments', projectAssignmentsSchema)

export default ProjectAssignment
