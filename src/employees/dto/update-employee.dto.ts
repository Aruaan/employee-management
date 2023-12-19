import { CreateEmployeeDto } from "./create-employee.dto";
import { PartialType } from '@nestjs/mapped-types'

// Extend the CreateEmployeeDto using PartialType from the nestjs library that contains the same fields, but all are optional.
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}