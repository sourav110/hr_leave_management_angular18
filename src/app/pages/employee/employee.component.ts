import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee, IApiResponse, IChildDepartment, IParentDepartment } from '../../models/leave';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  employeeObj: Employee = new Employee();
  parentDeptId: number = 0;

  prentDeptList: IParentDepartment [] = [];
  childDeptList: IChildDepartment [] = [];
  employeeList: Employee[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getParentDepartmentList();
    this.getChildDepartmentList();
    this.getEmployeeList();
  }

  getParentDepartmentList() {
    this.masterService.getParentDepartmentList().subscribe((res: IApiResponse) => {
      debugger
      if(res.result) {
        this.prentDeptList = res.data;
      }
    })
  }

  getChildDepartmentList() {
    this.masterService.getChildDepartmentList().subscribe((res: IApiResponse) => {
      debugger
      if(res.result) {
        this.childDeptList = res.data;
      }
    })
  }

  onChangeDept() {
    this.masterService.getChildDepartmentListByParentId(this.parentDeptId).subscribe((res: IApiResponse) => {
      debugger
      if(res.result) {
        this.childDeptList = res.data;
      }
    })
  }

  onSaveEmployee() {
    debugger
    this.masterService.saveEmployee(this.employeeObj).subscribe((res: Employee) => {
      alert('Employee with Id ' + res.employeeId + ' created'); 
      this.employeeObj = new Employee();
      this.getEmployeeList();
    })
  }

  onEdit(obj: Employee) {
    this.employeeObj = obj;
  }

  onUpdateEmployee(empId: number) {
    debugger
    this.masterService.updateEmployee(empId, this.employeeObj).subscribe((res: Employee) => {
      alert('Employee with Id ' + res.employeeId + ' updated'); 
      this.employeeObj = new Employee();
      this.getEmployeeList();
    })
  }

  onDeleteEmployee(empId: number) {
    const isConfirm = confirm('Are you sure to delete');
    if(isConfirm) {
      this.masterService.deleteEmployee(empId).subscribe((res: Employee) => {
        alert('Employee with Id ' + res.employeeId + ' deleted'); 
        this.getEmployeeList();
      })
    }
  }

  getEmployeeList() {
    debugger
    this.masterService.getEmployeeList().subscribe((res: Employee[]) => {
      this.employeeList = res;
    })
  }
}
