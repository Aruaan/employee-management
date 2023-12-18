import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { BadRequestException } from '@nestjs/common';
import { PaginatedEmployeeResult } from 'src/employees/dto/paginated-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.interface';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeesController', () => {
 let controller: EmployeesController
 let service: EmployeesService
 const mockEmployeesService = {
  findAllEmployees: jest.fn(),
  findAllDeleted: jest.fn(),
  deactivateEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  addEmployee: jest.fn()
 }
 const mockEmployee = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  homeAddress: {
    city: 'Springfield',
    zipCode: '12345',
    addressLine1: '742 Evergreen Terrace',
    addressLine2: ''
  },
  dateOfEmployment: new Date('2021-01-01'),
  dateOfBirth: new Date('1990-01-01'),
  isDeleted: false
}
 
 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     controllers: [EmployeesController],
     providers: [
       { provide: EmployeesService, useValue: mockEmployeesService },
     ],
   }).compile();

   controller = module.get<EmployeesController>(EmployeesController)
   service = module.get<EmployeesService>(EmployeesService)

 });

 it('should return a paginated list of all non-deleted employees', async () => {
    const result: PaginatedEmployeeResult = {
      data: [], limit: 10, offset: 0, total: 0, totalPages: 0
    }
    jest.spyOn(service, 'findAllEmployees').mockImplementation(async () => result)
    expect(await controller.findAll(10, 0)).toBe(result)
 })

 it('should return a paginated list of all deleted employees', async () => {
    const result: PaginatedEmployeeResult = {
      data: [], limit: 10, offset: 0, total: 0, totalPages: 0
    }
    jest.spyOn(service, 'findAllDeleted').mockImplementation(async () => result)
    expect(await controller.findAllDeleted(10, 0)).toBe(result)
 })

 it('should create and return a new employee', async () => {
  const createDto = new CreateEmployeeDto();

  jest.spyOn(service, 'addEmployee').mockImplementation(async () => mockEmployee as Employee);

  expect (await controller.addEmployee(createDto)).toBe(mockEmployee);
 })

 it('should deactivate an employee and return result', async () =>{

  jest.spyOn(service, 'deactivateEmployee').mockImplementation(async () => mockEmployee as Employee)

  expect (await controller.deactivate('1')).toBe(mockEmployee)
 })

 it('should update and return an employee', async () => {

  const updatedMockEmployee = {...mockEmployee, email: 'mladen.updated@example.com'}
  const updateDto = new UpdateEmployeeDto()

  jest.spyOn(service, 'updateEmployee').mockImplementation(async () => updatedMockEmployee as Employee)

  expect (await controller.updateEmployee('1', updateDto)).toBe(updatedMockEmployee)
 })

 it('should throw BadRequestException if offset is negative', async () => {
   await expect(controller.findAll(10, -1)).rejects.toThrow(BadRequestException)
 });
 

});
