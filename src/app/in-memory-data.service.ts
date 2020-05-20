import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
       { id: 1, name: 'Ramesh',dept:'ECE',place:'Trichy' },
  { id: 2, name: 'Naveen',dept:'ECE',place:'Dharmapuri' },
  { id: 3, name: 'Muthurathinam',dept:'ECE',place:'Tirupur' },
  { id: 4, name: 'Murugan',dept:'ECE',place:'Tanjavur' },
  { id: 5, name: 'Vijay',dept:'ECE',place:'Cuddalore' },
  { id: 6, name: 'Saravanan',dept:'MECH',place:'Palani' },
  { id: 7, name: 'Sudharason',dept:'Civil',place:'Nagapattinam' },
  { id: 8, name: 'Balaji',dept:'ECE',place:'Dindukal' },
  { id: 9, name: 'Ram',dept:'EEE',place:'Erode' },
  { id: 10, name: 'Ganesh',dept:'EEE',place:'Rasipuram' }
];
return{students};
  }
  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
  }


}