import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { StudentUserComponent } from './student-user/student-user.component';
import { LibrarianUserComponent } from './librarian-user/librarian-user.component';
import { LibrarianCreateComponent } from './librarian-create/librarian-create.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
    [{ path: 'studentUser', component: StudentUserComponent},
      { path: 'librarianUser', component: LibrarianUserComponent},
      {path: 'passwordSettings', component: PasswordSettingComponent}
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
