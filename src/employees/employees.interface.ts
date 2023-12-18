import { Document } from "mongoose";

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