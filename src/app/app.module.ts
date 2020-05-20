import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentService } from './student.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule}   from './app-routing/app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
import { StudentSearchComponent } from './student-search/student-search.component';

@NgModule({
  imports:      [ 
    BrowserModule, FormsModule,AppRoutingModule,
    HttpClientModule
     //HttpClientInMemoryWebApiModule.forRoot(
     // InMemoryDataService, {     dataEncapsulation: false }
   // )
     ],
  declarations: [
     AppComponent, StudentsComponent, StudentDetailComponent, MessageComponent, DashboardComponent, StudentSearchComponent,  ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
