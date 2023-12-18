import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employees.interface';
import { Model } from 'mongoose';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto'
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
@Injectable()
export class EmployeesService {

  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>){}
  

  async findAllEmployees(limit: number, offset: number): Promise<PaginatedEmployeeResult> {
    const total = await this.employeeModel.countDocuments({ isDeleted: false })
    const employees = await this.employeeModel.find({ isDeleted: false }).skip(offset).limit(limit).exec()
    const totalPages = Math.ceil(total / limit)

    return {
    data: employees,
    limit,
    offset,
    total,
    totalPages,
    }
}

  async findAllDeleted( limit : number, offset : number ):Promise<PaginatedEmployeeResult>{
    const total = await this.employeeModel.countDocuments({ isDeleted: true })
    const employees = await this.employeeModel.find({ isDeleted: true }).skip(offset).limit(limit).exec()
    const totalPages = Math.ceil(total / limit)

    return {
    data: employees,
    limit,
    offset,
    total,
    totalPages,
    }
  }

  async deactivateEmployee (id:string): Promise<Employee>{
    return this.employeeModel.findByIdAndUpdate(id, {isDeleted: true})
  }

  async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>{
    const newEmployee = new this.employeeModel(createEmployeeDto)
    return newEmployee.save()
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>{
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec();
  }
}
