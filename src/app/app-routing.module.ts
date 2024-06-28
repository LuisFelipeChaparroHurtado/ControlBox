import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateUser/:id', component: UpdateUserComponent },
  { path: 'listUsers', component: ListUsersComponent },
  { path: 'listBook', component: ListBooksComponent },
  { path: 'updateBook/:id', component: UpdateUserComponent },
  { path: 'detailsBook/:id', component: DetailsBookComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
