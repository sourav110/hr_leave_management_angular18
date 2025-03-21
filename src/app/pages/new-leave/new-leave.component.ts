import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable, single } from 'rxjs';
import { Employee, IApiResponse, ILeaveRequest, ILeaveType } from '../../models/leave';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {

  leaveReqForm: FormGroup = new FormGroup({});
  masterService = inject(MasterService);
  employeeList$: Observable<Employee[]> = new Observable<Employee[]>();
  leaveTypeList = signal<ILeaveType[]>([]);
  leaveRequestList: ILeaveRequest[] = []; 

  constructor() {
    this.initializeFrom();
  }

  initializeFrom() {
    this.leaveReqForm = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(this.masterService.loggedUserData.employeeId),
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      status: new FormControl("New"),
      reason: new FormControl(""),
      requestDate: new FormControl(new Date())
    })

    if(this.masterService.loggedUserData.role == "Employee") {
      this.leaveReqForm.controls['employeeId'].disable();
    }
  }

  ngOnInit(): void {
    this.getLeaveTypes();
    this.employeeList$ = this.masterService.getEmployeeList();
    this.getLeaveRequestData();
  }

  getLeaveTypes() {
    this.masterService.getLeaveTypes().subscribe((res: IApiResponse) => {
      this.leaveTypeList.set(res.data);
    })
  }

  onSave() {
    debugger
    const formValue = this.leaveReqForm.getRawValue();
    this.masterService.createNewLeaveRequest(formValue).subscribe((res: IApiResponse) => {
      if(res.result) {
        alert('Leave Request Raised');
      } else {
        alert(res.message);
      }      
    })
  }

  getLeaveRequestData() {
    if(this.masterService.loggedUserData.role == "Employee") {
      this.masterService.getAllLeaveRequestByEmpId(this.masterService.loggedUserData.employeeId).subscribe((res: IApiResponse) => {
        this.leaveRequestList = res.data;
      })
    } else {
      this.masterService.getAllLeaveRequest().subscribe((res: IApiResponse) => {
        this.leaveRequestList = res.data;
      }) 
    }
  }

}
