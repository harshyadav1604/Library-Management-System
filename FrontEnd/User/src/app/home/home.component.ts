import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
