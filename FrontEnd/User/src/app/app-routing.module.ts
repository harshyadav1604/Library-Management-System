import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { InventoryComponent } from './inventory/inventory.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { DefaultersComponent } from './defaulters/defaulters.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { ReturnedBookComponent } from './returned-book/returned-book.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentIssueBookComponent } from './student-issue-book/student-issue-book.component';
import { StudentReturnBookComponent } from './student-return-book/student-return-book.component';
import { LibrarianSettingsComponent } from './librarian-settings/librarian-settings.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { BookInfoComponent } from './book-info/book-info.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
      [{ path: 'book_info', component: BookInfoComponent},
        { path: 'inventory', component: InventoryComponent },
      { path: 'issue_book', component: IssueBookComponent },
      { path: 'return_book', component: ReturnBookComponent },
      { path: 'returned_book', component: ReturnedBookComponent},
      { path: 'defaulters', component: DefaultersComponent },
      { path: 'librarian_settings', component: LibrarianSettingsComponent}
    ]
  },
  {
    path: 'studentHome', component: StudentHomeComponent, canActivate: [AuthGuard], children:
      [
      { path: 'student_issue_book', component: StudentIssueBookComponent },
      { path: 'student_return_book', component: StudentReturnBookComponent},
      { path: 'student_settings', component: StudentSettingsComponent}
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
