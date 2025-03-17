import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from '../../models/leave';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient);
  router = inject(Router);

  loginObj: LoginObj = new LoginObj();

  onLogin() {
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj).subscribe((res: any) => {
      if(res.result) {
        alert('Login Success');
        sessionStorage.setItem('leaveAppUser', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      } else {
        alert('Login Failed: Wrong Credentials');
      }
    })
  }
}



export class LoginObj {
  userName: string;
  password: string;

  constructor() {
    this.userName = "";
    this.password = "";
  }
}
