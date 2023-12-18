import { Body, Controller, Post, Query, Get, Param, Patch, BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto';
import { Employee } from './employees.interface';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  async findAll(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult>{
    if (limit < 0 || offset < 0) {
      throw new BadRequestException('Limit and offset must be greater than or equal to 0');
    }
    return this.employeesService.findAllEmployees(limit, offset)
    .catch(error => {
      throw new HttpException('Error fetching employees', HttpStatus.INTERNAL_SERVER_ERROR);
    });
   }

   @Get('deleted')
   async findAllDeleted(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult> {
     try {
       const result = await this.employeesService.findAllDeleted(limit, offset)

       return result;
     } catch (error) {
       throw new HttpException('Error fetching deleted employees', HttpStatus.INTERNAL_SERVER_ERROR)
     }
   }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id:string): Promise<any> {
    const result = await this.employeesService.deactivateEmployee(id);
      if (!result) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }
      return result;
  }

  @Post()
  async addEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(createEmployeeDto)
  }

  @Patch(':id/update')
async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeesService.updateEmployee(id, updateEmployeeDto)
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee
}
}
