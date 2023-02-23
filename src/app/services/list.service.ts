import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { List } from '../interfaces/list';
import { Card } from '../interfaces/card';
import { CardService } from './card.service';

@Injectable({
    providedIn: 'root',
})
export class ListService {
    baseUrl: string = 'http://localhost:3000';
    constructor(private httpClient: HttpClient, private cardService: CardService) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // GET
    getListByTable(idTable: number): Observable<List[]> {
        return this.httpClient.get<List[]>(this.baseUrl + '/list?table=' + idTable);
    }

    getListAndCard(idTable: number): Observable<any> {
        return forkJoin([this.getListByTable(idTable), this.cardService.getCardByTableOne(idTable)]);
    }

    async getListAndCardByTable(idTable: number) {
        const newListTables = await this.getListAndCard(idTable)
            .pipe(
                map(([listTable, cardTable]) => {
                    // lặp qua mảng table
                    let newListTable = null;
                    newListTable = listTable.map((itemList: List) => {
                        let cardByList = cardTable.filter((itemCard: Card) => itemCard.list === itemList.id);
                        return {
                            ...itemList,
                            cards: cardByList,
                        };
                    });

                    return newListTable;
                }),
            )
            .toPromise();

        return newListTables;
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
