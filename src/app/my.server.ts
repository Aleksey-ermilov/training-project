import { LocalStorage } from '@ngx-pwa/local-storage';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Md5} from 'ts-md5/dist/md5';
import {Router} from '@angular/router';

export interface User {
  _id?: string,
  email: string,
  password: string,
  surname: string,
  name?: string,
  age?: string,
  gender?: string,
}

@Injectable({
  providedIn: 'root'
})
export class MyServer{
  constructor(
      private localStorage: LocalStorage,
      private router: Router
  ) {}

  id: string;
  user: string;

  storeUser(user, token){
    localStorage.setItem("id", user._id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));


    this.id = user._id;
    this.user = user;

    console.log("my server auth",user);

  }

  getUser(){
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user){
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout(){
    localStorage.clear();

    this.id = null;
    this.user = null;
  }

  authorizationUser(){
    return !!(localStorage.getItem('token') !== null);
  }

  getHash(password: string): string{
    return Md5.hashStr(password) + "";
  }


  /*
  JSON.stringify(this.user)
  let a = JSON.parse(localStorage.getItem('user'));
  */



  clear(): Observable<boolean> {
    return this.localStorage.clear()
  }

}
