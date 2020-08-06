import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const GetAllUsers = 'https://api.github.com/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public AllUsers: any[];
  constructor(private http: HttpClient) { }

  getUsers(): Observable<[]> {
    return this.http.get<[]>(GetAllUsers).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
