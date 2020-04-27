import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyServer, User} from '../my.server';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [MyServer]

})
export class EditUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private myServes: MyServer
  ){}

  form: FormGroup;
  genders = ["Male","Woman"];

  isEqual: boolean = true;
  /*password: string;
  repeatPassword: string;
  id: string;
  email: string;*/

  user: User = this.myServes.getUser();

  ngOnInit(): void {

    this.form = new FormGroup({
      email:new FormControl("", [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
      ]),
      repeatPassword: new FormControl("", [
        Validators.required,
      ]),
      surname: new FormControl("", [
        Validators.pattern(/^[А-ЯЁA-Z]{1}[а-яa-z]+$/),
        Validators.required,
      ]),
      name: new FormControl("",[
        Validators.pattern(/^[А-ЯЁA-Z]{1}[а-яa-z]+$/),
      ]),
      age: new FormControl("",[
        Validators.pattern(/^\d+$/)
      ]),
      gender: new FormControl(""),
    });

    console.log("при входе на стр edit",this.user);

    this.form.patchValue({
      email: this.user.email,
      //password: this.user.password,
      //repeatPassword: this.user.password,
      surname: this.user.surname,
      name: this.user.name,
      age: this.user.age,
      gender: this.user.gender
    });

  }

  submit() {
    if (this.form.value.password === this.form.value.repeatPassword){
      this.isEqual = true;
    }else {
      this.isEqual = false;
      return
    }

    if(this.form.valid){
      let user: User = {
        _id: this.user._id,
        email: this.form.value.email,
        password: this.form.value.password, //this.storage.getHash(this.form.value.password),
        surname: this.form.value.surname,
        name: (this.form.value.name) ? this.form.value.name : null,
        age: (this.form.value.age) ? this.form.value.age : null,
        gender: (this.form.value.gender) ? this.form.value.gender : null,
      };

    this.httpClient.post(
        "http://localhost:3000/editUser",
        user
    ).subscribe((data: any) => {

        console.log('изменый',data);
        this.myServes.setUser(data.user)
        }, error =>{
          console.log('error', error);
        });

    }
  }

  clear() {
    this.myServes.clear().subscribe(() => {});
  }


}
