import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { StudentServiceService } from '../services/student-service.service';
import { MatDialog } from '@angular/material/dialog';
import { IssueBookService } from '../services/issue-book.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReturnBookServiceService } from '../services/return-book-service.service';
import Swal from 'sweetalert2';


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
  fine: number;
  librarianId: number;
}

export interface returnBook {
  tid: number;
  issueBook: issue_Book;
  returnDate: Date;
  lateFeeAmount: number;
  libararianId: number;
}

let ELEMENT_DATA: issueBookTable[];

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent implements OnInit, AfterViewInit {
  studentControl = new FormControl<string | studentData>('');
  options: studentData[];
  filteredOptions: Observable<studentData[]>;
  displayedColumns: string[] = ['tid', 'name', 'author', 'publisher', 'edition', 'student', 'issueDate', 'dueDate', 'fine', 'librarianId','return'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table?: MatTable<issueBookTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentServiceService, public dialog: MatDialog, private issueBookService: IssueBookService,
    private returnBookService: ReturnBookServiceService) {
    this.getAllIssueBooks();
  }

  ngOnInit() {
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllStudents() {
    this.studentService.getStudents().subscribe((response) => {
      this.options = response;

      this.filteredOptions = this.studentControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const sid = typeof value === 'string' ? value : value?.sid;
          return sid ? this._filter(sid as string) : this.options.slice();
        }),
      );
    });
    console.log(this.options);
  }

  getAllIssueBooks() {

    let currentDate: Date = new Date();
    currentDate = this.getFormattedDateAsDate(currentDate);

    this.issueBookService.getIssueBooks().subscribe((response) => {

      this.dataSource.data = [];

      console.log(response);

      response.forEach((issueBook: issue_Book) => {


        const dueDate = new Date(issueBook.dueDate);

        console.log(issueBook.tid);

        let diffDate: number = this.diffInDays(currentDate, dueDate);

        if (diffDate < 0) {
          diffDate = 0;
        }

        console.log(diffDate);

        console.log("issueBooks " + issueBook.issueDate + " studentName " + issueBook.student.sid + " bookid" + issueBook.book.id + " tid" + issueBook.tid);
        let obj: issueBookTable = {
          tid: issueBook.tid, issueDate: issueBook.issueDate, dueDate: issueBook.dueDate, studentId: issueBook.student.sid,
          bookName: issueBook.book.name, bookAuthor: issueBook.book.author, bookPublisher: issueBook.book.publisher,
          bookEdition: issueBook.book.edition, fine: (diffDate) * 50.0, librarianId: issueBook.librarian.id
        };

        this.dataSource.data.push(obj);
        console.log(this.dataSource.data);
      });

      this.table?.renderRows();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getAllReturnBooks() {
    this.returnBookService.getReturnBook().subscribe((response) => {
      console.log(response);
      response.forEach((returnBk: returnBook) => {
        console.log(returnBk.issueBook.tid);
      });
      this.getAllIssueBooks();
    });
  }

  return_book(issueBookTid: number) {
    let currentDate: Date = new Date();
    currentDate = this.getFormattedDateAsDate(currentDate);
    let lateFee: number;


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return the book it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataSource.data.forEach(element => {
          if (element.tid == issueBookTid) {
            console.log(element.fine);
            lateFee = element.fine;
          }
        });

        let obj = { tid: null, issueBook: { tid: issueBookTid }, returnDate: currentDate, lateFeeAmount: lateFee, libararianId: 1 };

        this.returnBookService.createReturnBook(obj).subscribe((response) => {
          this.getAllReturnBooks();
        });
      }
    });


  }

  diffInDays(current: Date, due: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffInTime = current.getTime() - due.getTime();
    return (Math.floor(diffInTime / oneDay));
  }

  private getFormattedDateAsDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Create a new Date object with yyyy-mm-dd format
    return new Date(`${year}-${this.padZero(month)}-${this.padZero(day)}`);
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  displayFn(student_Data: studentData): string {
    return student_Data && student_Data.sid ? student_Data.sid : '';
  }

  private _filter(sid: string): studentData[] {
    const filterValue = sid.toLowerCase();

    return this.options.filter(option => option.sid.toLowerCase().includes(filterValue));
  }

}
