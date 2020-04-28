import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyServer, User} from '../my.server';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [MyServer]
})
export class AuthorizationComponent implements OnInit {

  constructor(
      private storage:MyServer,
      private router: Router,
      private httpClient: HttpClient,
      private myServer: MyServer
  ){}

  form: FormGroup;
  user: User;

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl("", [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    });
  }

  submit() {
    let auth = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    console.log(auth);
    this.httpClient.post(
        // "http://localhost:3000/authorization",
        "http://localhost:3000/user/authorization",
        auth
        )
        .subscribe((data: any) => {

          if (data.success){
            console.log('res',data);
            this.router.navigate(['editUser']);

            this.myServer.storeUser(data.user, data.token)
          }else {
            console.log(data.message);
          }

        }, error =>{
          console.log('error', error);
        });


    //console.log(this.form.value);
  }

}




/*
getE() {
    this.storage.getItem("Gf").subscribe((user) =>
    {
      console.log("gf: " , user);
    });
  }

get() {

  this.httpClient.get(this.urlServer, { params:  {"user": ["q@q", "2"]} })
      .subscribe((data: any) => {
        console.log('get',data);
      }, error =>{
        console.log('error', error);
      });
}

post() {

  const httpOptions = {
    headers: new HttpHeaders({
      'user':  'qwe',

    })
  };

  this.httpClient.post(
      this.urlServer,
      {name: "qwe", id: "1"},
      httpOptions
  ).subscribe((data: any) => {


    console.log('post',data);
  }, error =>{
    console.log('error', error);
  });
}
*/
