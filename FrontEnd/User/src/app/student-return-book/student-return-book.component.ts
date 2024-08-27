import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentServiceService } from '../services/student-service.service';
import { IssueBookService } from '../services/issue-book.service';
import { ReturnBookServiceService } from '../services/return-book-service.service';



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

export interface returnBook{
  tid: number;
  issueBook: issue_Book;
  returnDate: Date;
  lateFeeAmount: number;
  libararianId: number;
}

export interface returnBookTable{
  tid: number;
  bookName: string;
  bookAuthor: string;
  bookPublisher: string;
  bookEdition: number;
  studentId: string;
  issueDate: Date;
  dueDate: Date;
  fine: number;
  librarianId: number;
  returnedDate: Date;
}

let ELEMENT_DATA: returnBookTable[];

@Component({
  selector: 'app-student-return-book',
  templateUrl: './student-return-book.component.html',
  styleUrl: './student-return-book.component.css'
})
export class StudentReturnBookComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'author', 'publisher', 'edition','student', 'issueDate', 'dueDate', 'fine', 'returnedDate', 'librarianId'];
  returnedBkDataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table?: MatTable<returnBookTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private returnBookService: ReturnBookServiceService){
    this.getAllReturnedBkStudent();
  }

  ngAfterViewInit(){
    this.returnedBkDataSource.paginator = this.paginator;
    this.returnedBkDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.returnedBkDataSource.filter = filterValue.trim().toLowerCase();

    if (this.returnedBkDataSource.paginator) {
      this.returnedBkDataSource.paginator.firstPage();
    }
  }

  getAllReturnedBkStudent(){
    this.returnBookService.getReturnBook().subscribe((response)=> {

      this.returnedBkDataSource.data = [];

      response.forEach((returnedBk: returnBook) =>{

        if(returnedBk.issueBook.student.username == localStorage.getItem("id")){
          let obj: returnBookTable = { tid: returnedBk.tid, bookName: returnedBk.issueBook.book.name, bookAuthor: returnedBk.issueBook.book.author,
            bookPublisher: returnedBk.issueBook.book.publisher, bookEdition: returnedBk.issueBook.book.edition,
            studentId: returnedBk.issueBook.student.sid, issueDate: returnedBk.issueBook.issueDate, dueDate: returnedBk.issueBook.dueDate,
            fine: returnedBk.lateFeeAmount, librarianId: returnedBk.libararianId, returnedDate: returnedBk.returnDate
          };
  
          this.returnedBkDataSource.data.push(obj);
          console.log(this.returnedBkDataSource.data);
        }

      });

      this.table?.renderRows();
      this.returnedBkDataSource.paginator = this.paginator;
      this.returnedBkDataSource.sort = this.sort;
    });
  }
}
