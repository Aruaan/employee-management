import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Employee } from './employees.interface'
import { Model } from 'mongoose'
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'

@Injectable()
export class EmployeesService {
  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>){}

  // Find all active employees with pagination
  async findAllEmployees(limit: number , offset: number): Promise<PaginatedEmployeeResult> {
    try {
      const total = await this.employeeModel.countDocuments({ isDeleted: false });
      const employees = await this.employeeModel.find({ isDeleted: false }).skip(offset).limit(limit).exec()
      const totalPages = Math.ceil(total / limit)

      return { data: employees, limit, offset, total, totalPages }
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all employees')
    }
  }

  // Find all deactivated employees with pagination
  async findAllDeactivated(limit: number, offset: number): Promise<PaginatedEmployeeResult>{
    try {
      const total = await this.employeeModel.countDocuments({ isDeleted: true })
      const employees = await this.employeeModel.find({ isDeleted: true }).skip(offset).limit(limit).exec()
      const totalPages = Math.ceil(total / limit)

      return { data: employees, limit, offset, total, totalPages }
    } catch (error) {
      throw new InternalServerErrorException('Error fetching deleted employees')
    }
  }

  // Deactivate an employee by ID
  async deactivateEmployee(id: string): Promise<Employee> {
    try {
      const employee = await this.employeeModel.findById(id)
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`)
      }

      employee.isDeleted = true
      return await employee.save()
    } catch (error) {
      if (error.status === 404) {
        throw error
      }
      throw new InternalServerErrorException(`Error deactivating employee with ID ${id}`)
    }
  }

  // Add a new employee
  async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const newEmployee = new this.employeeModel(createEmployeeDto)
      return await newEmployee.save()
    } catch (error) {
      throw new InternalServerErrorException('Error adding new employee')
    }
  }

    // Update an employee by ID
    async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    try {
      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec()
      if (!updatedEmployee) {
        throw new NotFoundException(`Employee with ID ${id} not found`)
      }
      return updatedEmployee
    } catch (error) {
      if (error.status === 404) {
        throw error
      }
      throw new InternalServerErrorException(`Error updating employee with ID ${id}`)
    }
  }
}
