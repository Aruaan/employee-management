import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('EmployeesController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication();
    await app.init()
  });

  afterAll(async () => {
    await app.close()
  });

  it('/employees (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/employees').expect(200)

    expect(response.body).toBeDefined()
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('/employees/deactivated (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/employees/deactivated').expect(200)

    expect(response.body).toBeDefined()
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('/employees (POST)', async () => {
    const createEmployeeDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      homeAddress: {
        city: 'Springfield',
        zipCode: '12345',
        addressLine1: '742 Evergreen Terrace',
      },
      dateOfEmployment: '2022-01-01', 
      dateOfBirth: '1990-05-15'
    }

    const response = await request(app.getHttpServer())
      .post('/employees')
      .send(createEmployeeDto)
      .expect(201)

    expect(response.body).toBeDefined()
  })

  it('/employees/:id/update (PATCH)', async () => {
    const updateEmployeeDto = {
      name: 'Updated Name', 
      email: 'updated.email@example.com', 
      phoneNumber: '987-654-3210', 
      homeAddress: {
      city: 'New City',
      zipCode: '54321', 
      addressLine1: 'New Address Line 1', 
      addressLine2: 'Updated Address Line 2', 
  },
      dateOfEmployment: '2022-03-15', 
      dateOfBirth: '1985-08-10', 
      isDeleted: false
}


    const response = await request(app.getHttpServer())
      .patch('/employees/658107729e73becf14b94e97/update') 
      .send(updateEmployeeDto)
      .expect(200)

      expect(response.body).toBeDefined()
  })

  it('/employees/:id/deactivate (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/employees/658107729e73becf14b94e97/deactivate')
      .expect(200)

      expect(response.body).toBeDefined()
  })
})
