import mongoose, { Schema } from "mongoose"

const projectSchema = new Schema({
  project_code: { type: Number, required: true, unique: true },
  project_name: { type: String, required: true },
  project_description: { type: String },
})

const Projects = mongoose.model('projects', projectSchema)

export default Projects