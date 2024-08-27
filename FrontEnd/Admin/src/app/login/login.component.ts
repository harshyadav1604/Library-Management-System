import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  hide = true;
  loginScreenFlag = true;
  constructor(private router: Router, private adminService: AdminService){}

  login(){
    
    console.log("Login Button Clicked");
    let uname = this.username.value;
    let upass = this.password.value;
    console.log(uname + " " + upass);



    if (uname == null || upass == null || uname == "" || upass == "") {
      //alert("Username and Password Mandatory");
      Swal.fire({ html: 'Username and Password Mandatory', icon: 'warning' });
      return;
    } 


    let adminObj = {username: uname, password: upass};

    this.adminService.validateAdmin(adminObj).subscribe((response) =>{

      console.log(response);

      if(response == false){
        Swal.fire({ html: 'Invalid Username or Password', icon: 'warning' });
      }
      else{
        localStorage.setItem("id",uname);
        localStorage.setItem("pass",upass);

        this.router.navigate(['/home']);
        

      }

    });
   
    
  }


  forgotPassword(){
    this.loginScreenFlag = false;
  }

  newPassword(){

    console.log("New Password Submit Button Clicked");
    let uname = this.username.value;
    console.log(uname);

    if (uname == null || uname == "") {
      //alert("Username and Password Mandatory");
      Swal.fire({ html: 'Username and Password Mandatory', icon: 'warning' });
      return;
    } 


    let adminObj = {username: uname}; 

    this.adminService.newPassword(adminObj).subscribe((response) =>{

      console.log(response);

      if(response == false){
        Swal.fire({ html: 'Invalid Username or User Type', icon: 'warning' });
      }
      else{
        Swal.fire({ html: 'New Password has been send through mail', icon: 'success'});
        localStorage.setItem("id",uname);
        this.loginScreenFlag = true;
        this.router.navigate(['/login']);
      }
    });

  }

}
