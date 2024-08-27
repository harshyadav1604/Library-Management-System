import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  selector: 'app-returned-book',
  templateUrl: './returned-book.component.html',
  styleUrl: './returned-book.component.css'
})
export class ReturnedBookComponent implements AfterViewInit{
  displayedColumns: string[] = ['tid','name', 'author', 'publisher', 'edition','student', 'issueDate', 'dueDate', 'fine', 'returnedDate', 'librarianId'];
  returnedBookDataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table?: MatTable<returnBookTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentServiceService, private issueBookService: IssueBookService, 
    private returnBookService: ReturnBookServiceService){
    this.pushReturnedBook();
  }
  

  ngAfterViewInit(){
    this.returnedBookDataSource.paginator = this.paginator;
    this.returnedBookDataSource.sort = this.sort;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.returnedBookDataSource.filter = filterValue.trim().toLowerCase();

    if (this.returnedBookDataSource.paginator) {
      this.returnedBookDataSource.paginator.firstPage();
    }
  }

  pushReturnedBook(){
    this.returnBookService.getReturnBook().subscribe((response) =>{
      this.returnedBookDataSource.data = [];

      response.forEach((returnedBk: returnBook)=> {

        let obj: returnBookTable = { tid: returnedBk.tid, bookName: returnedBk.issueBook.book.name, bookAuthor: returnedBk.issueBook.book.author,
          bookPublisher: returnedBk.issueBook.book.publisher, bookEdition: returnedBk.issueBook.book.edition,
          studentId: returnedBk.issueBook.student.sid, issueDate: returnedBk.issueBook.issueDate, dueDate: returnedBk.issueBook.dueDate,
          fine: returnedBk.lateFeeAmount, librarianId: returnedBk.libararianId, returnedDate: returnedBk.returnDate
        };

        this.returnedBookDataSource.data.push(obj);
        console.log(this.returnedBookDataSource.data);
      });

      this.table?.renderRows();
      this.returnedBookDataSource.paginator = this.paginator;
      this.returnedBookDataSource.sort = this.sort;
    });

  }

}
