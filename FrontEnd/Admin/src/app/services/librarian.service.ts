import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibrarianService {

  baseURL:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  getLibrarians():Observable<any>
  {
    return this.http.get(this.baseURL+"librarians");
  }

  getLibrarianById(id: number):Observable<any>
  {
    return this.http.get(this.baseURL+"librarians/"+id);
  }

  updateLibrarian(librarianObj: any):Observable<any>{
    return this.http.put(this.baseURL+"librarians", librarianObj);
  }

}
