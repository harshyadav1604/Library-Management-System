import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnBookServiceService {

  baseURL:string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getReturnBook(): Observable<any>{
    return this.http.get(this.baseURL+"return-book");
  }

  createReturnBook(returnBookObj: any): Observable<any>{
    return this.http.post(this.baseURL+"return-book", returnBookObj);
  }
}
