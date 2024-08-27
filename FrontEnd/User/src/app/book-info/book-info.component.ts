import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BookServiceService } from '../services/book-service.service';
import Swal from 'sweetalert2';
import { BookCountService } from '../services/book-count.service';


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

export interface bookCnt {
  id: number;
  name: string;
  isbn: number;
  author: string;
  publisher: string;
  genre: string;
  edition: number;
  isActive: boolean;
  count: number;
}



let ELEMENT_DATA: book[];

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css'
})
export class BookInfoComponent implements AfterViewInit {

  name = new FormControl();
  isbn = new FormControl();
  author = new FormControl();
  publisher = new FormControl();
  genre = new FormControl();
  edition = new FormControl();
  displayedColumns: string[] = ['name', 'isbn', 'author', 'publisher', 'genre', 'edition', 'modify', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  isUpdateFlag = false;
  selectBookId: number = 0;

  @ViewChild(MatTable) table?: MatTable<book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: BookServiceService, private bookCntService: BookCountService) {
    this.getAllBooks();
  }

  getAllBooks() {
    this.service.getBooks().subscribe((response) => {
      console.log(response);
      response.forEach((book: book) => {
        console.log("books" + book.id);
        // let bkObjCnt = { id: null, name: book.name, isbn: book.isbn, author: book.author, publisher: book.publisher, genre: book.genre, edition: book.edition, isActive: true, count: 1};
        // this.bookCntService.createBookCnt(bkObjCnt).subscribe((response)=> {});
      });
      this.dataSource.data = response;
      this.table?.renderRows();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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




  add_book() {
    console.log("Button clicked");
    let name = this.name.value;
    let isbn = this.isbn.value;
    let author = this.author.value;
    let publisher = this.publisher.value;
    let genre = this.genre.value;
    let edition = this.edition.value;
    let flag = false;

    this.dataSource.data.forEach(books => {
      if (books.name == name && books.isbn == isbn && books.author == author && books.publisher == publisher && books.genre == genre && books.edition == edition) {
        flag = true;
        console.log("yes");

      }

    });

    console.log("flag is " + flag);

    if (flag) {
      Swal.fire({ html: 'Given details of the book is already there', icon: 'warning' });
      this.clear_book();
    }
    else {
      console.log(flag);
      let obj = { id: null, name: name, isbn: isbn, author: author, publisher: publisher, genre: genre, edition: edition, isActive: true };
      let bkObjCnt = { id: null, name: name, isbn: isbn, author: author, publisher: publisher, genre: genre, edition: edition, isActive: true, count: 1 };


      this.service.createBook(obj).subscribe((response) => {
        this.getAllBooks();
      });

      this.bookCntService.createBookCnt(bkObjCnt).subscribe((response) => { });


      this.table?.renderRows();
      this.clear_book();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    
    //Need to perform Validation
    //let id = ELEMENT_DATA.length + 1;
  }
  clear_book() {
    this.isUpdateFlag = false;
    this.name.setValue("");
    this.isbn.setValue("");
    this.author.setValue("");
    this.publisher.setValue("");
    this.genre.setValue("");
    this.edition.setValue("");
  }

  load_book(id: number) {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, modify it!"
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.dataSource.data.forEach(element => {
    //       if (element.id == id) {
    //         this.selectBookId = id;
    //         console.log(element);
    //         this.name.setValue(element.name);
    //         this.isbn.setValue(element.isbn);
    //         this.author.setValue(element.author);
    //         this.publisher.setValue(element.publisher);
    //         this.genre.setValue(element.genre);
    //         this.edition.setValue(element.edition);
    //         this.isUpdateFlag = true;
    //         return;
    //       }

    //     });



    //   }
    // });

    this.dataSource.data.forEach(element => {
      if (element.id == id) {
        this.selectBookId = id;
        console.log(element);
        this.name.setValue(element.name);
        this.isbn.setValue(element.isbn);
        this.author.setValue(element.author);
        this.publisher.setValue(element.publisher);
        this.genre.setValue(element.genre);
        this.edition.setValue(element.edition);
        this.isUpdateFlag = true;
        return;
      }

    });


  }


  update_book() {
    let name = this.name.value;
    let isbn = this.isbn.value;
    let author = this.author.value;
    let publisher = this.publisher.value;
    let genre = this.genre.value;
    let edition = this.edition.value;

    // this.dataSource.data.forEach(element => {
    //   if (element.id == this.selectBookId) {
    //     element.name = name;
    //     element.isbn = isbn;
    //     element.author = author;
    //     element.publisher = publisher;
    //     element.genre = genre;
    //   }
    // });

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
        let obj: book = { id: this.selectBookId, name: name, isbn: isbn, author: author, publisher: publisher, genre: genre, edition: edition, isActive: true };

        this.service.updateBook(obj).subscribe((response) => {
          this.getAllBooks();
        })

        Swal.fire({ html: 'Sucessfully Updated', icon: 'success' });
      }
    });

   

    this.clear_book();
    this.isUpdateFlag = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete_book(id: number) {
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

        this.service.getBookById(id).subscribe((response) => {


          console.log(response);
          console.log(response.isActive);
          console.log(response.name);

          response.isActive = false;

          let obj: book = { id: id, name: response.name, isbn: response.isbn, author: response.author, publisher: response.publisher, genre: response.genre, edition: response.edition, isActive: response.isActive };

          this.service.updateBook(obj).subscribe((response) => {
            this.getAllBooks();
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






}
