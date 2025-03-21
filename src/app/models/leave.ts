export interface IApiResponse {
    message: string
    result: boolean
    data: any
}

export class Employee {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;

    constructor() {
        this.employeeId = 0;
        this.employeeName = "";
        this.contactNo = "";
        this.emailId = "";
        this.deptId = 0;
        this.password = "";
        this.gender = "";
        this.role = "Employee";
    }
  }
  
  export interface IParentDepartment {
    departmentId: number
    departmentName: string
    departmentLogo: string
  }
  
  export interface IChildDepartment {
    childDeptId: number
    parentDeptId: number
    departmentName: string
  }

  export interface IEarnedLeave {
    earnedLeaveId: number
    employeeId: number
    totalEarnedLeaves: number
    totalSickEarnedLeaves: number
    lastUpdatedDate: string
    employeeName: string
  }

  export interface ILeaveRequest {
    leaveId: number
    employeeId: number
    leaveTypeId: number
    startDate: string
    endDate: string
    status: string
    reason: string
    requestDate: string
    employeeName: string
    contactNo: string
    typeName: string
  }
  
  export interface ILeaveType {
    leaveTypeId: number
    typeName: string
  }
  