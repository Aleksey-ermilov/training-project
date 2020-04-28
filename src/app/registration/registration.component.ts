import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyServer, User} from '../my.server';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [MyServer]
})
export class RegistrationComponent implements OnInit {
  constructor(
      private storage:MyServer,
      private router: Router,
      private httpClient: HttpClient
  ){}

  form: FormGroup;
  user: User;

  //EMAIL_PATTERN = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';

  password: string;
  repeatPassword: string;
  isEqual: boolean = true;

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

    });
  }


  submit() {

    if (this.form.value.password === this.form.value.repeatPassword){
      this.isEqual = true;
    }else {
      this.isEqual = false;
      return
    }

    this.user = {
      email: this.form.value.email,
      password: this.form.value.password, //this.storage.getHash(this.form.value.password),
      surname: this.form.value.surname,
      name: (this.form.value.name) ? this.form.value.name : null,
      age: (this.form.value.age) ? this.form.value.age : null,
      //gender: (this.form.value.age) ? this.form.value.age : null,
    };

    this.httpClient.post(
        //"http://localhost:3000/registration",
        "http://localhost:3000/user/registration",
        this.user
    ).subscribe((data: any) => {
      if (data.success){
        console.log(data.message);
        console.log('res',data);
        this.router.navigate(['authorization']);
      }else {
        console.log(data.message);
      }

    }, error =>{
      console.log('error', error);
    });

    /*
      this.form.reset()
    */
  }

  clear() {
    this.storage.clear().subscribe(() => {});
  }

}
