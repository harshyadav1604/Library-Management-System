import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

  constructor(private router: Router){
  }
  background: ThemePalette = "primary";
  activeLink = "inventory";
  
  logout(){
    Swal.fire({ html: 'Sucessfully Logged Out', icon: 'success' });
    localStorage.removeItem("id");
    localStorage.removeItem("pass");
    this.router.navigate(['/login']);
  }

}
