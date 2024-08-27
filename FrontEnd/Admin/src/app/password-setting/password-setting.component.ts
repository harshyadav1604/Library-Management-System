import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

export interface Admin{
  id: number;
  name: string;
  password: string;
  username: string;
  emailId: string;
  mobileNo: string;
  isActive: Boolean;
  createTs: Date;
  modifiedTs: Date;
}

@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrl: './password-setting.component.css'
})
export class PasswordSettingComponent {

  hide = true;
  hide1 = true;
  hide2 = true;
  oldPassword = new FormControl();
  newPassword = new FormControl();
  confirmPassword = new FormControl();
  validOldPassword: boolean = false;
  validConfirmPassword: boolean = false;


  constructor(private adminService: AdminService){}

  update(){

    let newPass = this.newPassword.value;
    let confirmPass = this.confirmPassword.value;

    if(confirmPass != newPass){
      this.validOldPassword = false;
      this.validConfirmPassword = true;
    }

    else{


      Swal.fire({
        title: "Are you sure do you want to change the password?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, modify it!"
      }).then((result) => {
        if (result.isConfirmed) {
  
          let oldPass = this.oldPassword.value;
          let newPass = this.newPassword.value;
          let confirmPass = this.confirmPassword.value;
          console.log(oldPass);
          console.log(newPass);
          console.log(confirmPass);
          
          
          if(oldPass != localStorage.getItem("pass")){
            this.validOldPassword = true;
          }
  
          
  
        
          else{
  
              this.adminService.getAdmin().subscribe((response) =>{
                response.forEach((admin: Admin) =>{
                  if(admin.username == localStorage.getItem("id")){
  
                    this.validConfirmPassword = false;
                    this.validOldPassword = false;
  
                    console.log("Yes");
  
                    localStorage.setItem("pass",newPass);
  
                    let obj = {id: admin.id, name: admin.name, password: newPass, username: admin.username, emailId: admin.emailId, isActive: admin.isActive, 
                      createTs: admin.createTs, mobileNo: admin.mobileNo
                    };
  
                    this.adminService.resetPass(obj).subscribe((response)=>{
  
                    });
  
                    Swal.fire({
                         title: "Updated!",
                         text: "The password has been updated.",
                         icon: "success"
                    });
  
                    this.oldPassword.setValue("");
                    this.newPassword.setValue("");
                    this.confirmPassword.setValue("");
                  }
                });
      
              });
            }
          
       
  
          
  
  
  
        }
      });
    }

  }
}
