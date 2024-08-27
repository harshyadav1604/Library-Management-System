import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LibrarianService } from '../services/librarian.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
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
  createTs: Date;
  modifiedTs: Date;
}

export interface userData{
  id: number,
  name: string;         //username
  password: string;
  usertype: string;
  isActive: boolean;
  emailId: string;
}





let ELEMENT_DATA: librarianData[] = [];

@Component({
  selector: 'app-librarian-user',
  templateUrl: './librarian-user.component.html',
  styleUrl: './librarian-user.component.css'
})
export class LibrarianUserComponent implements AfterViewInit{

  name = new FormControl();
  username = new FormControl();
  emailId = new FormControl();
  mobileNo = new FormControl();
  isUpdateFlag = false;
  selectLibrarianDetailId: number = 0;

  displayedColumns: string[] = ['id' ,'name', 'username', 'mobileNo', 'emailId', 'remove', 'modify'];
  librarianDataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table?: MatTable<librarianData>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
 

  constructor(private librarianService: LibrarianService, private librarianCreateService: LibrarianCreateService){
    this.getAllLibrarian();
  }
  

  ngAfterViewInit(){
    this.librarianDataSource.sort = this.sort;
    this.librarianDataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.librarianDataSource.filter = filterValue.trim().toLowerCase();

    if (this.librarianDataSource.paginator) {
      this.librarianDataSource.paginator.firstPage();
    }
  }

  getAllLibrarian(){
    this.librarianService.getLibrarians().subscribe((response) => {
      console.log(response);
      response.forEach((librarian: librarianData) => {
        console.log("librarian"+librarian.id);
      });
      this.librarianDataSource.data = response;
      this.table?.renderRows();
      this.librarianDataSource.paginator = this.paginator;
      this.librarianDataSource.sort = this.sort;
    });
  }


  removeLibrarian(id: number){


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        this.librarianService.getLibrarianById(id).subscribe((response) => {


          console.log(response);
          console.log(response.isActive);
          console.log(response.name);

          response.isActive = false;

          let obj: librarianData = { id: id, name: response.name, username: response.username, password: response.password, moblieNo: response.moblieNo, emailId: response.emailId, isActive: false, createTs: response.createTs,
            modifiedTs: response.modifiedTs};

          this.librarianService.updateLibrarian(obj).subscribe((response) => {
            this.getAllLibrarian();
          });




          // this.getAllBooks();
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "The book has been deleted.",
          //   icon: "success"
          // });
        });




      }
    });


  }

  add_librarian(){

    console.log("Button Clicked");

    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let mobileNo = this.mobileNo.value;
    let flag = false;

    this.librarianDataSource.data.forEach(librarians => {
      if(librarians.name == name && librarians.username == username && librarians.emailId == emailId){

        flag = true;
        console.log("yes");

      }

    });

    console.log("flag is "+ flag);

    if(flag){
      Swal.fire({html: 'Given Librarian details is already there', icon: 'warning'});

    }

    else{

    let obj = {id: null, name: name, username: username, password: username, moblieNo: mobileNo, emailId: emailId, isActive: true};
    // let objUser = {id: null, name: username, password: username, emailId: emailId, isActive: true, usertype: 'Librarian'};

    this.librarianCreateService.createLib(obj).subscribe((response) => {});

    // this.librarianCreateService.createUser(objUser).subscribe((response) => {});

    Swal.fire({html: 'Librarian Added Succesfully', icon: 'success'});

    }

    

    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.mobileNo.setValue("");
  }

  load_lib(id: number) {
  
    this.librarianDataSource.data.forEach(element => {
      if (element.id == id) {
        this.selectLibrarianDetailId = id;
        console.log(element);
        this.name.setValue(element.name);
        this.username.setValue(element.username);
        this.emailId.setValue(element.emailId);
        this.mobileNo.setValue(element.moblieNo);
        this.isUpdateFlag = true;
        return;
      }

    });


  }

  update_lib() {
    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let mobileNo = this.mobileNo.value;


    Swal.fire({
      title: "Are you sure do you want to update it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        this.librarianService.getLibrarianById(this.selectLibrarianDetailId).subscribe((response) => {


          console.log(response);
          console.log(response.isActive);
          console.log(response.name);

          let obj: librarianData = { id: this.selectLibrarianDetailId, name: name, username: username, password: response.password, moblieNo: mobileNo, emailId: emailId
            , isActive: response.isActive, createTs: response.createTs, modifiedTs: response.modifiedTs};

          

          this.librarianService.updateLibrarian(obj).subscribe((response) => {
            this.getAllLibrarian();
          });


        });
        
        

        Swal.fire({ html: 'Sucessfully Updated', icon: 'success' });
      }
    });

   

    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.mobileNo.setValue("");
    this.isUpdateFlag = false;
    this.librarianDataSource.paginator = this.paginator;
    this.librarianDataSource.sort = this.sort;
  }


  
}
