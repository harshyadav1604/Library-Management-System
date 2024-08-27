import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentCreateService } from '../services/student-create.service';


export interface studentData {
  id: number;
  name: string;
  username: string;
  password: string;
  moblieNo: string;
  emailId: string;
  branch: string;
  batchYear: number;
  isActive: boolean;
  sid: string;
}

export interface userData{
  id: number,
  name: string;         //username
  password: string;
  usertype: string;
  isActive: boolean;
  emailId: string;
}

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {

  name = new FormControl();
  username = new FormControl();
  emailId = new FormControl();
  sid = new FormControl();
  branch = new FormControl();
  batchYear = new FormControl();
  mobileNo = new FormControl();

  constructor(private studentCreateService: StudentCreateService){

  }

  

  add_student(){

    console.log("Button Clicked");

    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let sid = this.sid.value;
    let branch = this.branch.value;
    let batchYear = this.batchYear.value;
    let mobileNo = this.mobileNo.value;

    let objStud = {id: null, name: name, username: username, password: username, moblieNo: mobileNo, emailId: emailId, sid: sid, branch: branch, batchYear: batchYear,
      isActive: true};


    this.studentCreateService.createStd(objStud).subscribe((response) => {});



    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.sid.setValue("");
    this.branch.setValue("");
    this.batchYear.setValue("");
    this.mobileNo.setValue("");

  }

}
