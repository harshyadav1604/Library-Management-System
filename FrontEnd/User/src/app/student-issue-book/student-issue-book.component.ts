import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IssueBookService } from '../services/issue-book.service';
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

export interface issue_Book {
  tid: number;
  issueDate: Date;
  dueDate: Date;
  isActive: boolean;
  student: studentData;
  book: book;
  librarian: { id: number };
}

export interface issueBookTable {
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
  selector: 'app-student-issue-book',
  templateUrl: './student-issue-book.component.html',
  styleUrl: './student-issue-book.component.css'
})
export class StudentIssueBookComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'author', 'publisher', 'edition', 'student', 'issueDate', 'dueDate', 'librarianId'];
  issueBkDataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table?: MatTable<issueBookTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private issueBkService: IssueBookService){
    this.getAllIssueBkStudent();
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

  getAllIssueBkStudent() {
    this.issueBkService.getIssueBooks().subscribe((response) => {

      this.issueBkDataSource.data = [];

      response.forEach((issueBook: issue_Book) => {
        if (issueBook.student.username == localStorage.getItem("id")) {

          console.log("issueBooks " + issueBook.issueDate + " studentName " + issueBook.student.sid + " bookid" + issueBook.book.id + " tid" + issueBook.tid);

          let obj: issueBookTable = {
            tid: issueBook.tid, issueDate: issueBook.issueDate, dueDate: issueBook.dueDate, studentId: issueBook.student.sid,
            bookName: issueBook.book.name, bookAuthor: issueBook.book.author, bookPublisher: issueBook.book.publisher,
            bookEdition: issueBook.book.edition, librarianId: issueBook.librarian.id
          };

          this.issueBkDataSource.data.push(obj);

          console.log(this.issueBkDataSource.data);

        }

      });

      this.table?.renderRows();
      this.issueBkDataSource.paginator = this.paginator;
      this.issueBkDataSource.sort = this.sort;
    });
  }


}
