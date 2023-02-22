import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { List } from '../interfaces/list';

@Injectable({
    providedIn: 'root',
})
export class ListService {
    baseUrl: string = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // GET
    getListByTable(idTable: number) {
        return this.httpClient.get<List[]>(this.baseUrl + '/list?table=' + idTable);
    }

    // POST
    createList(idTable: number, title: string) {
        return this.httpClient
            .post<List[]>(this.baseUrl + '/list', {
                table: idTable,
                title: title,
            })
            .pipe(catchError(this.handleError));
    }
}
