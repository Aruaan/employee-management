import * as mongoose from 'mongoose'

export const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  homeAddress: {
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false } 
  },
  dateOfEmployment: { type: Date, required: true },
  dateOfBirth: { type: Date, required: true },
  isDeleted: { type: Boolean, default: false }
})