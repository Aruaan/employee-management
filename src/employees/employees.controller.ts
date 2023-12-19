import { Body, Controller, Post, Query, Get, Param, Patch, BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginatedEmployeeResult } from './dto/paginated-employee.dto';
import { Employee } from './employees.interface';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiQuery, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('employee')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
    @ApiOperation({
      summary: 'Find All Employees',
      description: 'Retrieves a list of employees with pagination. You can specify the number of results to return (limit) and an offset for pagination.',
    })
    async findAll(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult>{
    if (limit < 0 || offset < 0) {
      throw new BadRequestException('Limit and offset must be greater than or equal to 0');
    }

    return this.employeesService.findAllEmployees(limit, offset)
    .catch(error => {
      throw new HttpException('Error fetching employees', HttpStatus.INTERNAL_SERVER_ERROR);
    });
   }  
    
   @Get('deactivated')
   @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
   @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
   @ApiOperation({
    summary: 'Find All Deactivated Employees',
    description: 'Retrieves a paginated list of all deactivated employees. You can specify the number of results to return (limit) and an offset for pagination.',
    })
   async findAllDeactivated(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0): Promise<PaginatedEmployeeResult> {
     try {
       const result = await this.employeesService.findAllDeactivated(limit, offset)

       return result;
     } catch (error) {
       throw new HttpException('Error fetching deleted employees', HttpStatus.INTERNAL_SERVER_ERROR)
     }
   }

   @ApiOperation({
    summary: 'Add New Employee',
    description: 'Creates a new employee with the provided details. Returns data of the newly added employee.',
    })    
    @Post()
    async addEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(createEmployeeDto)
    } 

    @ApiOperation({
      summary: 'Update Employee Details',
      description: 'Updates the details of an employee specified by their ID using the provided data. Returns "Not Found" if selected ID is not found.',
    })
    @Patch(':id/update')
    async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeesService.updateEmployee(id, updateEmployeeDto)
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee
    }

   @ApiOperation({
    summary: 'Deactivate Employee',
    description:'Deactivates an employee by ID, and the employee is considered inactive in the database. If successful returns employee data, otherwise a not found error. ',
    })
    @Patch(':id/deactivate')
    async deactivate(@Param('id') id:string): Promise<any> {
    const result = await this.employeesService.deactivateEmployee(id);
      if (!result) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }
      return result;
    }   
}
