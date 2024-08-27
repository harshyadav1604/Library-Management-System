import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LibrarianCreateService } from '../services/librarian-create.service';

export interface librarianData {
  id: number;
	name: string;
	username: string;
	password: string;
	moblieNo: string;
	emailId: string;
	isActive: boolean;
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
  selector: 'app-librarian-create',
  templateUrl: './librarian-create.component.html',
  styleUrl: './librarian-create.component.css'
})
export class LibrarianCreateComponent {

  name = new FormControl();
  username = new FormControl();
  emailId = new FormControl();
  mobileNo = new FormControl();

  constructor(private librarianCreateService: LibrarianCreateService){

  }

  add_librarian(){

    console.log("Button Clicked");

    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let mobileNo = this.mobileNo.value;

    let obj = {id: null, name: name, username: username, password: username, moblieNo: mobileNo, emailId: emailId, isActive: true};
    

    this.librarianCreateService.createLib(obj).subscribe((response) => {});

   

    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.mobileNo.setValue("");
  }

}
