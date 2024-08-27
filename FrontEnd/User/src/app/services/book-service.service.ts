import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookServiceService {

  baseURL:string = "http://localhost:8080/";

  
  constructor(private http:HttpClient) 
  { }

  getBooks():Observable<any>
  {
    return this.http.get(this.baseURL+"books");
  }
  

  getBookById(id: number):Observable<any>
  {
    return this.http.get(this.baseURL+"books/"+id);
  }

  createBook(bookObj: any):Observable<any>
  {
    return this.http.post(this.baseURL+"books", bookObj);
  }

  updateBook(bookObj: any):Observable<any>{
    return this.http.put(this.baseURL+"books", bookObj);
  }



}
