import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string = "http://localhost:8080/";

  
  constructor(private http:HttpClient) 
  { }

  

  validateUser(user: any):Observable<any>
  {
    return this.http.post(this.baseURL+"login", user);
  }
  

  getUser(): Observable<any>{
    return this.http.get(this.baseURL+"user");
  }
  

  updateUser(userObj: any):Observable<any>{
    return this.http.put(this.baseURL+"user", userObj);
  }

  resetPass(userObj: any):Observable<any>{
    return this.http.put(this.baseURL+"resetPassword", userObj);
  }

  newPassword(user: any):Observable<any>
  {
    return this.http.post(this.baseURL+"forgotPassword", user);
  }

 
}
