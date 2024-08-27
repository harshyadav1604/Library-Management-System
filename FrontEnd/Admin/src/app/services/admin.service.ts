import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  getAdmin():Observable<any>
  {
    return this.http.get(this.baseURL+"admin");
  }

  validateAdmin(admin: any):Observable<any>
  {
    return this.http.post(this.baseURL+"loginAdmin", admin);
  }

  newPassword(admin: any):Observable<any>
  {
    return this.http.post(this.baseURL+"forgotPasswordAdmin", admin);
  }

  updateAdmin(admin: any):Observable<any>
  {
    return this.http.put(this.baseURL+"admin", admin);
  }

  resetPass(admin: any):Observable<any>
  {
    return this.http.put(this.baseURL+"resetAdminPass", admin);
  }

}
