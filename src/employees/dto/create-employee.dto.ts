import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

class HomeAddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => HomeAddressDto)
  @IsNotEmpty()
  readonly homeAddress: HomeAddressDto;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateOfEmployment: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
}

