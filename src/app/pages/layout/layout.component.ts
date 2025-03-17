import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  router = inject(Router);

  loggedUserData  : any;

  constructor() {
    const storageData = sessionStorage.getItem("leaveAppUser");
    if(storageData) {
      debugger
      this.loggedUserData = JSON.parse(storageData);
    }
  }

  onLogOff() {
    sessionStorage.removeItem("leaveAppUser");
    this.router.navigateByUrl('login');
  }
}
