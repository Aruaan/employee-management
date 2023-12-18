import { Employee } from "../employees.interface";

export class PaginatedEmployeeResult {
  data: Employee[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}