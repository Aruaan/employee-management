import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schemas/employees.schema';
import { EmployeesService } from './employees.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Employee', schema: EmployeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
