import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  user_type : string = "";
  hide = true;
  loginScreenFlag = true;
  constructor(private router: Router, private userService: UserService){
  }
  login(){
    console.log("Login Button Clicked");
    console.log(this.user_type);
    let User_type = this.user_type;
    let uname = this.username.value;
    let upass = this.password.value;
    console.log(uname + " " + upass);
    console.log(User_type);

    if (uname == null || upass == null || uname == "" || upass == "") {
      //alert("Username and Password Mandatory");
      Swal.fire({ html: 'Username and Password Mandatory', icon: 'warning' });
      return;
    } 

    if(this.user_type == "" || this.user_type == null){
      Swal.fire({ html: 'please select whether you are student or librarian', icon: 'warning' });
      return;
    }

    let userObj = {name: uname, password: upass, usertype: User_type};


    this.userService.validateUser(userObj).subscribe((response) =>{

      console.log(response);

      if(response == false){
        Swal.fire({ html: 'Invalid Username or Password', icon: 'warning' });
      }
      else{
        localStorage.setItem("id",uname);
        localStorage.setItem("pass",upass);
        localStorage.setItem("user_type", this.user_type);
        localStorage.setItem("token",response.token)

        if(this.user_type == "Librarian"){
          console.log("Librarian Page");
          
          this.router.navigate(['/home']);
        }
        
        if(this.user_type == "Student"){
          this.router.navigate(['/studentHome']);
        }

      }
    });
    
    
    // else if(uname == "harsh" && upass == "hars1604"){
    //   //console.log("Ussername and pass are correct");
    //   Swal.fire({ html: 'Sucessfully Logged In', icon: 'success' });
    //   localStorage.setItem("id",uname);
    //   localStorage.setItem("pass",upass);
    //   this.router.navigate(['/home']);
    // }
    // else{
    //   //alert("Invalid Username or Password");
    //   Swal.fire({ html: 'Invalid Username or Password', icon: 'warning' });
    // }
  }

  forgotPassword(){
    this.loginScreenFlag = false;
  }

  newPassword(){

    console.log("New Password Submit Button Clicked");
    console.log(this.user_type);
    let User_type = this.user_type;
    let uname = this.username.value;
    console.log(uname);
    console.log(User_type);

    if (uname == null || uname == "") {
      //alert("Username and Password Mandatory");
      Swal.fire({ html: 'Username and Password Mandatory', icon: 'warning' });
      return;
    } 

    if(this.user_type == "" || this.user_type == null){
      Swal.fire({ html: 'please select whether you are student or librarian', icon: 'warning' });
      return;
    }

    let userObj = {name: uname, usertype: User_type}; 

    this.userService.newPassword(userObj).subscribe((response) =>{

      console.log(response);

      if(response == false){
        Swal.fire({ html: 'Invalid Username or User Type', icon: 'warning' });
      }
      else{
        Swal.fire({ html: 'New Password has been send through mail', icon: 'success'});
        localStorage.setItem("id",uname);
        localStorage.setItem("user_type", this.user_type);
        localStorage.setItem("token",response.token);
        this.loginScreenFlag = true;
        this.router.navigate(['/login']);
      }
    });

  }

}

