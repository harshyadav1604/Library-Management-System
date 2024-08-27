import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

export interface User{
  id: number;
  name: string;
  password: string;
  usertype: string;
  emailId: string;
  isActive: Boolean;
  createTs: Date;
}

@Component({
  selector: 'app-librarian-settings',
  templateUrl: './librarian-settings.component.html',
  styleUrl: './librarian-settings.component.css'
})
export class LibrarianSettingsComponent {

  hide = true;
  hide1 = true;
  hide2 = true;
  oldPassword = new FormControl();
  newPassword = new FormControl();
  confirmPassword = new FormControl();
  validOldPassword: boolean = false;
  validConfirmPassword: boolean = false;

  constructor(private userService: UserService){}

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
  
              this.userService.getUser().subscribe((response) =>{
                response.forEach((user: User) =>{
                  if(user.name == localStorage.getItem("id")){
  
                    this.validConfirmPassword = false;
                    this.validOldPassword = false;
  
                    console.log("Yes");
  
                    localStorage.setItem("pass",newPass);
  
                    let obj = {id: user.id, name: user.name, password: newPass, usertype: user.usertype, emailId: user.emailId, isActive: user.isActive, createTs: user.createTs};
  
                    this.userService.resetPass(obj).subscribe((response)=>{
  
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
