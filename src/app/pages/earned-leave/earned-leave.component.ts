import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { IApiResponse, IEarnedLeave } from '../../models/leave';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-earned-leave',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

  masterService = inject(MasterService);
  earnLeaveList: IEarnedLeave[] = []; 

  constructor(){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.masterService.getAllEarnedLeaves().subscribe((res: IApiResponse) => {
      if(res.result) {
        this.earnLeaveList = res.data;
      } else {
        alert(res.message);
      }
    })
  }
}
