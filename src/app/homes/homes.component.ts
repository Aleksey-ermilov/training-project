import { Component, OnInit } from '@angular/core';
import {JsonOb} from './JsonOb';
import {ActivatedRoute, Router} from '@angular/router';

export interface Home {
  id: string;
  name: string;
  rooms: Room;
}

export interface Room {
  id: string,
  roomName: string,
}

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  id;

  jsonOb = new JsonOb();
  arrHome:Home[];
  home: Home;
  textBtn: string;

  rooms: Room[] = [];
  textBtnRoom: string;
  room: Room;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
  ){}

  ngOnInit() {
    this.arrHome = this.jsonOb.arr.map(h => ({
      name: h.homeName,
      id: h.id,
      // @ts-ignore
      rooms: h.rooms.map(a => ({id: a.id, roomName: a.roomName }))
    }));
    this.textBtn = this.arrHome[0].name;
    this.home = this.arrHome[0] as Home;


    this.getRoom(this.home);
    this.room = this.home.rooms[0] as Room;
  }

  onClickSelect(home: any){
    this.rooms = [];

    this.home = home;
    this.textBtn = home.name;

    this.getRoom(home);

  }

  onClickRoomSelect(room: any) {
    this.room = room;
    this.textBtnRoom = room.roomName;
  }

  getRoom(home){
    for (let i = 0; i < home.rooms.length; i++){
      this.rooms[i] = home.rooms[i];
    }
    this.textBtnRoom = this.rooms[0].roomName;
    this.room = this.rooms[0];
  }

  onClickBtn(){
    if (this.home.name.trim() === "") {
      return;
    }

    this.textBtn = this.home.name;
    this.home.name = this.home.name.trim();

    this.jsonOb.setHomeName(this.home);
  }


  onClickBtnRoom() {
    if (this.room.roomName.trim() === "") {
      return;
    }

    this.textBtnRoom = this.room.roomName;
    this.room.roomName = this.room.roomName.trim();
  }

}

