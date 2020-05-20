import { Component, OnInit } from '@angular/core';
import {Student} from'../student';
import {STUDENTS} from'../mock-student';
import { MessageService } from '../message.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

students: Student[];
 

 constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => {
          this.students = students
        });
  }

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.studentService.addStudent({ name } as Student)
    .subscribe(student => {
      this.students.push(student);
    });
}
delete(student: Student): void {
  this.students = this.students.filter(s => s !== student);
  this.studentService.deleteStudent(student).subscribe();
}
}