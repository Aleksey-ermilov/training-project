import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {MyServer} from './my.server';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private myServer: MyServer,private router: Router,){}
  canActivate() {
    if (this.myServer.authorizationUser()){
      return true
    } else {
      this.router.navigate(["authorization"])
      return false
    }
  }
  
}
