import { Injectable } from '@angular/core';
import { MessageService} from './message.service';
import { Observable, of } from 'rxjs';
import { Student } from './student';
import{ STUDENTS} from './mock-student';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private studentsUrl = 'http://localhost:3001/api/students';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
   getStudents (): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }

  getStudentNo404<Data>(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/?id=${id}`;
    return this.http.get<Student[]>(url)
      .pipe(
        map(students => students[0]),         tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} student id=${id}`);
        }),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /* GET students whose name contains search term */
  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty student array.
      return of([]);
    }
    return this.http.get<Student[]>(`${this.studentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found students matching "${term}"`) :
         this.log(`no students matching "${term}"`)),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new student to the server */
  addStudent (student: Student): Observable<Student> {
  return this.http.post<Student>('http://localhost:3001/api/students/add', student, this.httpOptions).pipe(
    tap((newStudent: Student) => this.log(`added student w/ id=${newStudent.id}`)),
    catchError(this.handleError<Student>('addStudent'))
  );
}

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `http://localhost:3001/api/students/delete`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent (student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}
