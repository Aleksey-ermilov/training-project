import { Component, OnInit } from '@angular/core';
import {MyServer} from '../my.server';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MyServer]
})
export class HeaderComponent implements OnInit {

  constructor(
      private myServer: MyServer,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.myServer.logout();
    console.log("Вы вышли!!!");
    this.router.navigate(["authorization"]);

    return false
  }

}
