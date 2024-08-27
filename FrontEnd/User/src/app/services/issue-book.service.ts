import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueBookService {

  baseURL:string = "http://localhost:8080/";

  constructor(private http: HttpClient){}

  getIssueBooks():Observable<any>{
    return this.http.get(this.baseURL+"issue-book");
  }

  createIssueBook(issueBookObj: any): Observable<any>
  {
    return this.http.post(this.baseURL+"issue-book", issueBookObj);
  }


  getIssueBookByTid(tid: number):Observable<any>{
    return this.http.get(this.baseURL+"issue-book/"+tid);
  }

  updateIssueBook(issueBookObj: any): Observable<any>{
    return this.http.put(this.baseURL+"issue-book", issueBookObj);
  }
}
