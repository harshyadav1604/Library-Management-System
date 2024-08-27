import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookCountService {

  baseURL:string = "http://localhost:8080/";

  
  constructor(private http:HttpClient) 
  { }

  getBookCnt():Observable<any>
  {
    return this.http.get(this.baseURL+"bookCount");
  }
  

  getBookCntById(id: number):Observable<any>
  {
    return this.http.get(this.baseURL+"bookCount/"+id);
  }

  createBookCnt(bookObj: any):Observable<any>
  {
    return this.http.post(this.baseURL+"bookCount", bookObj);
  }

  updateBookCnt(bookObj: any):Observable<any>{
    return this.http.put(this.baseURL+"bookCount", bookObj);
  }


}
