import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employees.interface';
import { Model } from 'mongoose';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto'
@Injectable()
export class EmployeesService {
  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>){}
  

  async findAllEmployees(page: number, limit: number): Promise<PaginatedEmployeeResult> {
    const skip = (page - 1) * limit;
    const total = await this.employeeModel.countDocuments({ isDeleted: false });
    const employees = await this.employeeModel.find({ isDeleted: false }).skip(skip).limit(limit).exec();
    const totalPages = Math.ceil(total / limit);
  
    return {
      data: employees,
      page,
      limit,
      total,
      totalPages,
    };
  }
}
