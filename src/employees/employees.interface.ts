import { Document } from "mongoose";

//Represents an Employee document in the database.
export interface Employee extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  homeAddress: {
    city: string;
    zipCode: string;
    addressLine1: string;
    addressLine2?: string;
  }
  dateOfEmployment: Date;
  dateOfBirth: Date;
  isDeleted: boolean;
}