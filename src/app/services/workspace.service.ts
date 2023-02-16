import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workspace } from '../interfaces/workspace';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(private httpClient: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // GET
    getWorkspace(): Observable<Workspace[]> {
        return this.httpClient.get<Workspace[]>(this.baseUrl + '/workspace', {
            responseType: 'json',
        });
    }

    getWorkspaceTick(id: number): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl + '/user?id=' + id);
    }

    // POST
    createWorkspace(data: any): Observable<Workspace> {
        return this.httpClient.post<Workspace>(this.baseUrl + '/workspace', data).pipe(catchError(this.handleError));
    }
}
