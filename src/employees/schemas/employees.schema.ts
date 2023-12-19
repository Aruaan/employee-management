import * as mongoose from 'mongoose';
import validator from 'validator';
// Defining the schema for the employee collection

export const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email address',
    }
  },
  phoneNumber: { type: String, required: true },
  homeAddress: {
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String }
  },
  dateOfEmployment: { type: Date, required: true },
  dateOfBirth: { type: Date, required: true },
  isDeleted: { type: Boolean, default: false }
}, {
  versionKey: false, // Exclude the version key from documents
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toString(); // Transform _id to 'id' in JSON
      delete ret._id; // Remove '_id' field from JSON
    }
  }
});
