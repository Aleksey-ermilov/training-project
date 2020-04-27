import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomesComponent} from './homes/homes.component';
import {HomePageComponent} from './home-page/home-page.component';

import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "authorization", component: AuthorizationComponent},
  {path: "editUser", component: EditUserComponent, canActivate: [AuthGuard]},
  //{path: "editUser/:id", component: EditUserComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "homes", component: HomesComponent, canActivate: [AuthGuard]},
  //{path: "homes/:id", component: HomesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
