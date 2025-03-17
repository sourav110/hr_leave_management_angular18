import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponse } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  constructor(private http: HttpClient) { }

  getParentDepartmentList(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetParentDepartment");
  }

  getChildDepartmentList(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetAllChildDepartment");
  }

  getChildDepartmentListByParentId(parentDeptId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetChildDepartmentByParentId?deptId=" + parentDeptId)
  }

  saveEmployee(obj: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + "CreateEmployee", obj); 
  }

  updateEmployee(empId: number, obj: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + "UpdateEmployee/" + empId, obj); 
  }

  deleteEmployee(empId: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl + "DeleteEmployee/" + empId); 
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + "GetAllEmployees");
  }
  
}

