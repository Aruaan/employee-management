import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<PaginatedEmployeeResult>{
    page =+ page
    limit =+ limit
    
    return this.employeesService.findAllEmployees(page, limit)
  }
}
