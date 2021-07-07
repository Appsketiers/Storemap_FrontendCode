import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: HelperService, private router: Router)
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
      return this.authService.isLoggedIn();
      //  let user : any =this.authService.isLoggedIn();
      //   if(user){
      //     return true;
      //   }
      //   else{
         
      //     return this.router.parseUrl("/auth");
          
      //   }
      
     
  }
  
}
