import { Employee } from "../employees.interface";

/**
 * Class representing the result of a paginated query for employees.
 * Contains the data and pagination details.
 */
export class PaginatedEmployeeResult {
  data: Employee[];
  limit: number;
  offset: number;
  total: number;
  totalPages: number;
}