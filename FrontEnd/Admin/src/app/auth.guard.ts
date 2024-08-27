import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot,  UrlTree, Router} from '@angular/router';

@Injectable({
  providedIn : 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router){
  }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    
    let uname, upass;
    uname = localStorage.getItem("id");
    upass = localStorage.getItem("pass");


    
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
