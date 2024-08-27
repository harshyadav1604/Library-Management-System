import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookServiceService } from '../services/book-service.service';
import { StudentServiceService } from '../services/student-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IssueBookService } from '../services/issue-book.service';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

export interface book {
  id: number;
  name: string;
  isbn: number;
  author: string;
  publisher: string;
  genre: string;
  edition: number;
  isActive: boolean;
}

export interface issue_Book{
  tid: number;
  issueDate: Date;
  dueDate: Date;
  isActive: boolean;
  student: studentData;
  book: book;
  librarian:{id: number};
}

export interface issueBookTable{
  tid: number;
  issueDate: Date;
  dueDate: Date;
  studentId: string;
  bookName: string;
  bookAuthor: string;
  bookPublisher: string;
  bookEdition: number;
  librarianId: number;
}


let ELEMENT_DATA: issueBookTable[];

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrl: './issue-book.component.css'
})
export class IssueBookComponent implements OnInit, AfterViewInit{

  dt: Date = new Date();
  due_dt: Date = new Date();
  date = new FormControl();
  due_date = new FormControl();
  studentControl = new FormControl<string | studentData>('');
  bookControl = new FormControl<string | book>('');
  displayedColumns: string[] = ['name', 'author', 'publisher', 'edition','student', 'issueDate', 'dueDate', 'librarianId','modify'];
  issueBkDataSource = new MatTableDataSource(ELEMENT_DATA);
  isBookInfoBtnVisible : boolean = false;
  isStudentInfoBtnVisible: boolean = false;
  stdId: string;
  isUpdateFlag = false;
  selectBookId: number = 0;
 

  options: studentData[];
  bookoptions: book[];

  @ViewChild(MatTable) table?: MatTable<issueBookTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 



  filteredOptions: Observable<studentData[]>;
  bookFilteredOptions: Observable<book[]>;

  constructor(private bookService: BookServiceService, private studentService: StudentServiceService, public dialog: MatDialog, private issueBookService:IssueBookService){
    this.dt.setDate(this.dt.getDate());
    this.due_dt.setDate(this.dt.getDate() + 7);
    this.date.setValue(this.dt);
    this.due_date.setValue(this.due_dt);
    this.getAllIssueBooks();
    this.date.disable();
    this.due_date.disable();

  }

  ngOnInit() {
    this.getAllStudents();
    this.getAllBooks();
  }

  ngAfterViewInit() {
    this.issueBkDataSource.paginator = this.paginator;
    this.issueBkDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.issueBkDataSource.filter = filterValue.trim().toLowerCase();

    if (this.issueBkDataSource.paginator) {
      this.issueBkDataSource.paginator.firstPage();
    }
  }

  getAllStudents() {
    this.studentService.getStudents().subscribe((response) => {
      this.options = response;

      this.studentControl.valueChanges.subscribe(x =>{
        let studObj = this.options.find(studObj => studObj == x);
        // console.log(studObj);
        // console.log(studObj.sid);
        this.stdId = studObj.sid;
        

        this.isStudentInfoBtnVisible = false;
        if(studObj != null) {
          this.isStudentInfoBtnVisible = true;
        }
      });



      this.filteredOptions = this.studentControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const sid = typeof value === 'string' ? value : value?.sid;
          return sid ? this._filter(sid as string) : this.options.slice();
        }),
      );
    });
    //console.log(this.options);
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.bookoptions = response;

      this.bookControl.valueChanges.subscribe(x => {
       let obj =  this.bookoptions.find(obj => obj == x);
       //console.log(obj);

       this.isBookInfoBtnVisible = false;
       if(obj != null){
        this.isBookInfoBtnVisible = true;
       }
      });

      this.bookFilteredOptions = this.bookControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filterBook(name as string) : this.bookoptions.slice();
        }),
      );
      //console.log(this.bookoptions);
    });
  }

  getAllIssueBooks(){
    this.issueBookService.getIssueBooks().subscribe((response) => {

      console.log(response);

      this.issueBkDataSource.data = [];

      response.forEach((issueBook: issue_Book) => {

        console.log("issueBooks "+issueBook.issueDate+" studentName "+ issueBook.student.sid+" bookid"+ issueBook.book.id+" tid"+issueBook.tid);
        let obj:issueBookTable = {tid: issueBook.tid, issueDate: issueBook.issueDate, dueDate: issueBook.dueDate, studentId: issueBook.student.sid,
           bookName: issueBook.book.name, bookAuthor: issueBook.book.author, bookPublisher: issueBook.book.publisher,
          bookEdition: issueBook.book.edition, librarianId: issueBook.librarian.id};
        this.issueBkDataSource.data.push(obj);
        console.log(this.issueBkDataSource.data);
      }); 

      this.table?.renderRows();
      this.issueBkDataSource.paginator = this.paginator;
      this.issueBkDataSource.sort = this.sort;  
    });
  }

  submit(){
    let book = this.bookControl.value;
    let student = this.studentControl.value;
    let issue_date = this.date.value;
    let due_date = this.due_date.value;

    let formatted_issue_date = this.getFormattedDateAsDate(issue_date);
    let formatted_due_date = this.getFormattedDateAsDate(due_date);
    //const differenceInMs: number = formatted_issue_date.getTime() - formatted_due_date.getTime();
    // const differenceInDays: number = Math.floor(differenceInMs / (1000*60*60*24));
    // console.log(formatted_issue_date+" "+formatted_due_date);
    // console.log(differenceInDays);

    console.log(student);

    let count: number;

    this.issueBookService.getIssueBooks().subscribe((response) =>{

      count = response.filter((issueBk: issue_Book) => issueBk.student.sid === this.stdId).length;
      console.log(count);

      if (count >= 3) {
        console.log("Student already has 3 books issued.");
        Swal.fire({ html: 'This student already has 3 books issued.', icon: 'warning' });
        return;
      }

      Swal.fire({ html: 'Book is successfully Issued', icon: 'success' });
      let obj = {tid: null, issueDate: formatted_issue_date, dueDate: formatted_due_date, isActive: true, student: student, book: book, librarian:  {"id" : 1}};
      this.issueBookService.createIssueBook(obj).subscribe((response) => {
           this.getAllIssueBooks();
      });
      console.log(obj);

      this.table?.renderRows();
      this.bookControl.setValue("");
      this.studentControl.setValue("");
      this.issueBkDataSource.paginator = this.paginator;
      this.issueBkDataSource.sort = this.sort;


      
    });

    

    


    

    // let obj = {tid: null, issueDate: formatted_issue_date, dueDate: formatted_due_date, isActive: true, student: student, book: book, librarian:  {"id" : 1}};

    // this.issueBookService.createIssueBook(obj).subscribe((response) => {
    //   this.getAllIssueBooks();
    // });
    // console.log(obj);

    // this.table?.renderRows();
    // this.bookControl.setValue("");
    // this.studentControl.setValue("");
    // this.issueBkDataSource.paginator = this.paginator;
    // this.issueBkDataSource.sort = this.sort;


  }


  private getFormattedDateAsDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
  
    // Create a new Date object with yyyy-mm-dd format
    return new Date(`${year}-${this.padZero(month)}-${this.padZero(day)}`);
  }
  
  // Helper function to add leading zero for months and days
  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  modifyIssueBk(tid: number) {
    // Find the issue book entry by tid
    const issueBook = this.issueBkDataSource.data.find(element => element.tid === tid);
    this.selectBookId = issueBook.tid;
  
    if (issueBook) {
      // Set the book name in bookControl
      const selectedBook = this.bookoptions.find(book => book.name === issueBook.bookName);
      if (selectedBook) {
        this.bookControl.setValue(selectedBook);
      }
  
      // Set the student id in studentControl
      const selectedStudent = this.options.find(student => student.sid === issueBook.studentId);
      if (selectedStudent) {
        this.studentControl.setValue(selectedStudent);
      }
  
      // Optionally, set other fields if needed
      // For example, issueDate and dueDate can also be set here if needed
      // this.date.setValue(issueBook.issueDate);
      // this.due_date.setValue(issueBook.dueDate);
  
      // Set update flag to true
      this.isUpdateFlag = true;
    }
  }
  

  updateIssueBk(){

    let book = this.bookControl.value;
    let student = this.studentControl.value;
    let issue_date = this.date.value;
    let due_date = this.due_date.value;

    let formatted_issue_date = this.getFormattedDateAsDate(issue_date);
    let formatted_due_date = this.getFormattedDateAsDate(due_date);

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

        let obj = {tid: this.selectBookId, issueDate: formatted_issue_date, dueDate: formatted_due_date, isActive: true, student: student, book: book, librarian:  {"id" : 1}};

        this.issueBookService.updateIssueBook(obj).subscribe((response) => {
          this.getAllIssueBooks();
        });

        Swal.fire({ html: 'Sucessfully Updated', icon: 'success' });
      }
    });

    this.bookControl.setValue("");
    this.studentControl.setValue("");
    this.isUpdateFlag = false;
    this.issueBkDataSource.paginator = this.paginator;
    this.issueBkDataSource.sort = this.sort;
    
  }



  displayFn(student_Data: studentData): string {
    return student_Data && student_Data.sid ? student_Data.sid : '';
  }

  private _filter(sid: string): studentData[] {
    const filterValue = sid.toLowerCase();

    return this.options.filter(option => option.sid.toLowerCase().includes(filterValue));
  }

  displayFnBook(student_Data: book): string {
    return student_Data && student_Data.name ? student_Data.name : '';
  }

  private _filterBook(name: string): book[] {
    const filterValue = name.toLowerCase();

    return this.bookoptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  dialog_open(){
    let studentData = this.studentControl.value;
    this.dialog.open(StudentData,{  data: studentData });
    
  }

  dialogBook_open(){
    let bookData = this.bookControl.value;
    this.dialog.open(BookData, {data: bookData});
  }


}

@Component({
  selector: 'studentData',
  templateUrl: 'studentData.html',
  styleUrl: 'studentData.css',
  standalone: true,
})
export class StudentData {
  studentInfo : studentData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: studentData) {
    this.studentInfo = data;
    console.log(this.studentInfo);
  }
}

@Component({
  selector: 'bookData',
  templateUrl: 'bookData.html',
  styleUrl : 'bookData.css',
  standalone: true,
})
export class BookData{
  bookInfo: book;
  constructor(@Inject(MAT_DIALOG_DATA) public data: book){
    this.bookInfo = data;
    console.log(this.bookInfo);
  }

}