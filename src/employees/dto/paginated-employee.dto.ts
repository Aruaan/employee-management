import { Employee } from "../employees.interface";

export class PaginatedEmployeeResult {
  data: Employee[];
  limit: number;

  offset: number;
  total: number;
  totalPages: number;
}