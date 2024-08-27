import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentCreateService {

  baseURL:string = "http://localhost:8080/";


  constructor(private http:HttpClient) { }

  // createStd(studentOdj: any): Observable<any>{
  //   return this.http.put(this.baseURL+"createStudents", studentObj);
  // }

  createStd(studentObj: any):Observable<any>{
    return this.http.post(this.baseURL+"createStudents", studentObj);
  }
  

  // createUserStud(userObj: any):Observable<any>{
  //   return this.http.post(this.baseURL+"createUser", userObj);
  // }

  
  
}
