import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Model } from 'mongoose';
import { Employee } from './employees.interface';
describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    jest.mock(Model<Employee>)
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('something random', () => {
    const testEmployeeDto: CreateEmployeeDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      homeAddress: {
        city: "Test City",
        zipCode: "12345",
        addressLine1: "123 Test Street",
        addressLine2: "Apt 101"
      },
      dateOfEmployment: new Date("2021-01-01"),
      dateOfBirth: new Date("1990-05-15")
    };
    
    service.addEmployee(testEmployeeDto);
    console.log(service.findAllEmployees());
  });
});
