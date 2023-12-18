export class UpdateEmployeeDto {
  readonly name?: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly homeAddress?: {
    city?: string;
    zipCode?: string;
    addressLine1?: string;
    addressLine2?: string;
  };
  readonly dateOfEmployment?: Date;
  readonly dateOfBirth?: Date;
}
