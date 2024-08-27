import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
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

export interface Branch{
  value: string;
  viewValue: string;
}

export interface BatchYear{
  value: number;
  viewValue: number;
}


let ELEMENT_DATA: studentData[] = [];


@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrl: './student-user.component.css'
})
export class StudentUserComponent implements AfterViewInit{

  name = new FormControl();
  username = new FormControl();
  emailId = new FormControl();
  sid = new FormControl();
  branch = new FormControl();
  batchYear = new FormControl();
  mobileNo = new FormControl();
  isUpdateFlag = false;
  selectStudentDetailId: number = 0;

  branchs: Branch[] = [
    {value: 'Computer Science', viewValue: 'CSE'},
    {value: 'Mechanical', viewValue: 'Mechanical'},
    {value: 'Electrical', viewValue: 'Electrical'},
    {value: 'Civil', viewValue: 'Civil'},
    {value: 'Chemistry', viewValue: 'Chemistry'},
    {value: 'Physics', viewValue: 'Physics'},
    {value: 'MnC', viewValue: 'MnC'},
  ];

  batchs: BatchYear[] = [
    {value: 2019, viewValue: 2019},
    {value: 2020, viewValue: 2020},
    {value: 2021, viewValue: 2021},
    {value: 2022, viewValue: 2022},
    {value: 2023, viewValue: 2023},
    {value: 2024, viewValue: 2024},
  ]


  displayedColumns: string[] = ['name', 'username', 'mobileNo', 'emailId', 'branch', 'batchYear','sid', 'remove', 'modify'];
  studentDataSource = new MatTableDataSource(ELEMENT_DATA);


  @ViewChild(MatTable) table?: MatTable<studentData>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
 

  constructor(private studentService: StudentService, private studentCreateService: StudentCreateService){
    this.getAllStudent();
  }
  

  ngAfterViewInit(){
    this.studentDataSource.sort = this.sort;
    this.studentDataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.studentDataSource.paginator) {
      this.studentDataSource.paginator.firstPage();
    }
  }

  getAllStudent(){
    this.studentService.getStudents().subscribe((response) => {
      console.log(response);
      response.forEach((student: studentData) => {
        console.log("student"+student.id);
      });
      this.studentDataSource.data = response;
      this.table?.renderRows();
      this.studentDataSource.paginator = this.paginator;
      this.studentDataSource.sort = this.sort;
    });
  }

  removeStudent(id: number){


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

        // this.dataSource.data.forEach(element => {
        //   if (element.id == id) {
        //     element.isActive = false;
        //   }
        // });

        this.studentService.getStudentById(id).subscribe((response) => {


          console.log(response);
          console.log(response.isActive);
          console.log(response.name);

          response.isActive = false;

          let obj: studentData = { id: id, name: response.name, username: response.username, password: response.password, moblieNo: response.moblieNo, emailId: response.emailId, branch: response.branch, batchYear: response.batchYear
            , isActive: false, sid: response.sid, createTs: response.createTs, modifiedTs: response.modifiedTs};

          this.studentService.updateStudent(obj).subscribe((response) => {
            this.getAllStudent();
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


  add_student(){

    console.log("Button Clicked");

    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let sid = this.sid.value;
    let branch = this.branch.value;
    let batchYear = this.batchYear.value;
    let mobileNo = this.mobileNo.value;
    let flag = false;
    

    // this.studentDataSource.data.forEach(students => {
    //   if(students.name == name && students.username == username && students.emailId == emailId && students.sid == sid && students.branch == branch){

    //     flag = true;
    //     console.log("yes");

    //   }

    // });


    console.log("flag is "+ flag);

    if(flag){
      Swal.fire({html: 'Given Student details is already there', icon: 'warning'});
      
    }
    else{

      let objStud = {id: null, name: name, username: username, password: username, moblieNo: mobileNo, emailId: emailId, sid: sid, branch: branch, batchYear: batchYear,
        isActive: true};

      console.log(objStud);
  
      // let objUser = {id: null, name: username, password: username, emailId: emailId, isActive: true, usertype: 'Student'};
  
      this.studentCreateService.createStd(objStud).subscribe((response) => {});
  
      // this.studentCreateService.createUserStud(objUser).subscribe((response) => {});

      Swal.fire({html: 'Student Added Succesfully', icon: 'success'});


    }

    
    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.sid.setValue("");
    this.mobileNo.setValue("");
    this.branch.setValue("");
    this.batchYear.setValue("");

  }

  load_std(id: number) {
  
    this.studentDataSource.data.forEach(element => {
      if (element.id == id) {
        this.selectStudentDetailId = id;
        console.log(element);
        this.name.setValue(element.name);
        this.username.setValue(element.username);
        this.emailId.setValue(element.emailId);
        this.sid.setValue(element.sid);
        this.branch.setValue(element.branch);
        this.batchYear.setValue(element.batchYear);
        this.mobileNo.setValue(element.moblieNo);
        this.isUpdateFlag = true;
        return;
      }

    });


  }

  update_std() {
    let name = this.name.value;
    let username = this.username.value;
    let emailId = this.emailId.value;
    let sid = this.sid.value;
    let branch = this.branch.value;
    let batchYear = this.batchYear.value;
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

        this.studentService.getStudentById(this.selectStudentDetailId).subscribe((response) => {


          console.log(response);
          console.log(response.isActive);
          console.log(response.name);

          let obj: studentData = { id: this.selectStudentDetailId, name: name, username: username, password: response.password, moblieNo: mobileNo, emailId: emailId, branch: branch, batchYear: batchYear
            , isActive: response.isActive, sid: sid, createTs: response.createTs, modifiedTs: response.modifiedTs};

          

          this.studentService.updateStudent(obj).subscribe((response) => {
            this.getAllStudent();
          });


        });
        
        

        Swal.fire({ html: 'Sucessfully Updated', icon: 'success' });
      }
    });

   

    this.name.setValue("");
    this.username.setValue("");
    this.emailId.setValue("");
    this.sid.setValue("");
    this.branch.setValue("");
    this.batchYear.setValue("");
    this.mobileNo.setValue("");
    this.isUpdateFlag = false;
    this.studentDataSource.paginator = this.paginator;
    this.studentDataSource.sort = this.sort;
  }

}
