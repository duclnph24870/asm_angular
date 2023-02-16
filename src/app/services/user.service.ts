import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(private httpClient: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    checkEmail(email: any) {
        return this.httpClient.get<[]>(this.baseUrl + '/user?email=' + email).pipe(catchError(this.handleError));
    }

    registor(data: any): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl + '/user', data).pipe(catchError(this.handleError));
    }
}
