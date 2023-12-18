import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly homeAddress: {
    city: string;
    zipCode: string;
    addressLine1: string;
    addressLine2?: string;
  }

  @ApiProperty()
  readonly dateOfEmployment: Date;

  @ApiProperty()
  readonly dateOfBirth: Date;
}

