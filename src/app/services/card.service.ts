import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card } from '../interfaces/card';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    baseUrl: string = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // GET
    getCardByListOne(idList: number) {
        return this.httpClient.get<Card[]>(this.baseUrl + '/cards?list=' + idList).pipe(catchError(this.handleError));
    }

    getCardByTableOne(idTable: number) {
        return this.httpClient.get<Card[]>(this.baseUrl + '/cards?table=' + idTable).pipe(catchError(this.handleError));
    }

    // POST
    createCard(data: Card) {
        return this.httpClient.post<Card[]>(this.baseUrl + '/cards', data).pipe(catchError(this.handleError));
    }

    // PUT
    editCard(data: any, idCard: number) {
        return this.httpClient.put<Card[]>(this.baseUrl + '/cards/' + idCard, data).pipe(catchError(this.handleError));
    }

    completeCard(data: any, idCard: number) {
        return this.httpClient.put<Card[]>(this.baseUrl + '/cards/' + idCard, data);
    }
}
