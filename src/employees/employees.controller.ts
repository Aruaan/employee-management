import { Body, Controller, Post, Query, Get, Param, Patch } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto';
import { Employee } from './employees.interface';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  findAll(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult>{

    return this.employeesService.findAllEmployees(limit, offset)
  }

  @Get('deleted')
  findAllDeleted(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult>{

    return this.employeesService.findAllDeleted(limit, offset)
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id:string): Promise<any> {
    return this.employeesService.deactivateEmployee(id)
  }

  @Post()
  async addEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(createEmployeeDto)
  }

  @Patch(':id/update')
  async updateEmployee(@Param('id') id:string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>{
    return this.employeesService.updateEmployee(id, updateEmployeeDto)
  }
}
