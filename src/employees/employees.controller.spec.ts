import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { BadRequestException } from '@nestjs/common';

describe('EmployeesController', () => {
 let controller: EmployeesController;
 const mockEmployeesService = {
  findAllEmployees: jest.fn(),
 };
 
 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     controllers: [EmployeesController],
     providers: [
       { provide: EmployeesService, useValue: mockEmployeesService },
     ],
   }).compile();

   controller = module.get<EmployeesController>(EmployeesController);
 });

 it('should throw BadRequestException if limit is negative', async () => {
   await expect(controller.findAll(-1, 0)).rejects.toThrow(BadRequestException);
 });

 it('should throw BadRequestException if offset is negative', async () => {
   await expect(controller.findAll(10, -1)).rejects.toThrow(BadRequestException);
 });
});
