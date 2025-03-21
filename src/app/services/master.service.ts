import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponse, IEarnedLeave, ILeaveRequest } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  loggedUserData: any;

  constructor(private http: HttpClient) {
    const storageData = sessionStorage.getItem("leaveAppUser");
    if (storageData) {
      debugger
      this.loggedUserData = JSON.parse(storageData);
    }
  }

  //#region Employee
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
  //#endregion

  //#region Earned Leave
  getAllEarnedLeaves(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetAllEarnedLeaves");
  }
  //#endregion

  //#region Leave Request
  getLeaveTypes(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetLeaveTypes");
  }

  getAllLeaveRequest(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetAllLeaveRequest");
  }

  getAllLeaveRequestByEmpId(empId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + "GetAllLeaveRequestByEmpId?id=" + empId);
  } 

  createNewLeaveRequest(obj: ILeaveRequest): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.baseUrl + "CreateNewLeaveRequest", obj);
  }
  //#endregion
}

