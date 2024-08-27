import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot,  UrlTree, Router} from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn : 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router, private service: UserService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let uname, upass, utype;
    uname = localStorage.getItem("id");
    upass = localStorage.getItem("pass");
    utype = localStorage.getItem("user_type");

    let userObj = {name: uname, password: upass, usertype: utype};

    // this.service.validateUser(userObj).subscribe((response) =>{

    //   console.log(response);

    //   if(response == true){
    //     return true;
    //   }

    //   this.router.navigate(['/login']);
    //   return false;

    // });

    return true;

    // if(uname == "harsh" && upass == "hars1604"){
    //   return true;
    // }
      

    
    
  }
  
}
