import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn():boolean{
    let uname, upass;
    uname = localStorage.getItem("id");
    upass = localStorage.getItem("pass");

    if(uname == "harsh" && upass == "hars1604"){
      return true;
    }
    return false;
  }
  
}
