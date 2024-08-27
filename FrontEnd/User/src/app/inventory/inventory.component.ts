import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BookServiceService } from '../services/book-service.service';
import { BookCountService } from '../services/book-count.service';




export interface bookCnt{
  id: number;
  name: string;
  isbn: number;
  author: string;
  publisher: string;
  genre: string;
  edition : number;
  isActive: boolean;
  count: number;
}



let ELEMENT_DATA: bookCnt[] = [];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements AfterViewInit {
  num = new FormControl();
  displayedColumns: string[] = ['name', 'isbn', 'author', 'publisher', 'genre', 'edition', 'count', 'add', 'subtract'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  isUpdateFlag = false;
  selectBookId: number = 0;
  

  @ViewChild(MatTable) table?: MatTable<bookCnt>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: BookServiceService, private bookCntService: BookCountService) {
    this.getAllBooks();
  }


  getAllBooks() {
    this.bookCntService.getBookCnt().subscribe((response) => {
      console.log(response);
      response.forEach((book: bookCnt) => {
        console.log("books"+book.id);
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


  add_book(id: number) {

    // const increment = Number(this.num.value);
    Swal.fire({
      title: 'Add Books',
      input: 'text',
      inputLabel: 'Enter the number of books to add',
      inputPlaceholder: 'Enter numbers of books to ba added',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const increment = Number(result.value); // Convert to number

        if(increment<0){
          Swal.fire({ html: 'Please enter the value more than 0', icon: 'warning' });
        }
        else{

          this.dataSource.data.forEach(element => {
            if (element.id == id) {
              let bkObjCnt = { id: id, name: element.name, isbn: element.isbn, author: element.author, publisher: element.publisher, 
                genre: element.genre, edition: element.edition, isActive: true, count:(element.count + increment)};
             
              this.bookCntService.updateBookCnt(bkObjCnt).subscribe((response) => {
                this.getAllBooks();
              });
     
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
     
            }
     
          });
          
        }

        
      }
    });


    
  }

  subtract_book(id: number) {

    // const decrement = Number(this.num.value);

    // this.dataSource.data.forEach(element => {
    //   if (element.id == id) {
    //     let bkObjCnt = { id: id, name: element.name, isbn: element.isbn, author: element.author, publisher: element.publisher, 
    //       genre: element.genre, edition: element.edition, isActive: true, count:(element.count - decrement)};
        
    //     this.bookCntService.updateBookCnt(bkObjCnt).subscribe((response) => {
    //       this.getAllBooks();
    //     });

    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;

    //   }

    // });

    Swal.fire({
      title: 'Subtract Books',
      input: 'text',
      inputLabel: 'Enter the number of books to subtract',
      inputPlaceholder: 'Enter numbers of books to be subtracted',
      showCancelButton: true,
      confirmButtonText: 'Subtract',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const decrement = Number(result.value); // Convert to number

        if(decrement<0){
          Swal.fire({ html: 'Please enter the value more than 0', icon: 'warning' });
        }
        else{

          this.dataSource.data.forEach(element => {
            if (element.id == id) {

              if(element.count - decrement<0){
                Swal.fire({ html: 'Please see the count of the book', icon: 'warning' });

              }
              else{

                let bkObjCnt = { id: id, name: element.name, isbn: element.isbn, author: element.author, publisher: element.publisher, 
                  genre: element.genre, edition: element.edition, isActive: true, count:(element.count - decrement)};
               
                this.bookCntService.updateBookCnt(bkObjCnt).subscribe((response) => {
                  this.getAllBooks();
                });
       
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              
     
            }
     
          });
          
        }

        
      }
    });



  }
}
