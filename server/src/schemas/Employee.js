import mongoose, { Schema } from 'mongoose'

const employeeSchema = new Schema({
  employee_id: { type: Number, required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
})

const Employees = mongoose.model('employees', employeeSchema)

export default Employees