import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent }  from '../student-detail/student-detail.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
//import { StudentsComponent } from './students/students.component';
import { StudentsComponent } from '../students/students.component';
//import { CommonModule } from '@angular/common';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: StudentDetailComponent },
  { path: 'students', component: StudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //declarations: []
})
export class AppRoutingModule { }
