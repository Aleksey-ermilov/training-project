import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {AppRoutingModule} from './app-routing.module';
import { HomesComponent } from './homes/homes.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    EditUserComponent,
    AuthorizationComponent,
    HomesComponent,
    HeaderComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
