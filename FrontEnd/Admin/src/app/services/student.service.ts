import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseURL:string = "http://localhost:8080/";


  constructor(private http:HttpClient) { }

  getStudents():Observable<any>
  {
    return this.http.get(this.baseURL+"students");
  }

  getStudentById(id: number):Observable<any>
  {
    return this.http.get(this.baseURL+"students/"+id);
  }

  updateStudent(studentObj: any):Observable<any>{
    return this.http.put(this.baseURL+"students", studentObj);
  }
}

