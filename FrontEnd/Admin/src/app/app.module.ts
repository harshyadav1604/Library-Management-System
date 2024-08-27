import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogTitle,MatDialogContent,} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentUserComponent } from './student-user/student-user.component';
import { LibrarianUserComponent } from './librarian-user/librarian-user.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { LibrarianCreateComponent } from './librarian-create/librarian-create.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StudentUserComponent,
    LibrarianUserComponent,
    StudentCreateComponent,
    LibrarianCreateComponent,
    PasswordSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    BrowserAnimationsModule,
    MatTable,
    MatTableModule,
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
    MatDialogModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule { }
