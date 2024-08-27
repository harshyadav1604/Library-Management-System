import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

import { MatTable } from '@angular/material/table';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { DefaultersComponent } from './defaulters/defaulters.component';
import { BookServiceService } from './services/book-service.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogTitle,MatDialogContent,} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { ReturnedBookComponent } from './returned-book/returned-book.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentIssueBookComponent } from './student-issue-book/student-issue-book.component';
import { StudentReturnBookComponent } from './student-return-book/student-return-book.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { LibrarianSettingsComponent } from './librarian-settings/librarian-settings.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InventoryComponent,
    IssueBookComponent,
    ReturnBookComponent,
    DefaultersComponent,
    ReturnedBookComponent,
    StudentHomeComponent,
    StudentIssueBookComponent,
    StudentReturnBookComponent,
    StudentSettingsComponent,
    LibrarianSettingsComponent,
    BookInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatTable,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    HttpClientModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule
  ],
  providers: [BookServiceService, provideNativeDateAdapter(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
