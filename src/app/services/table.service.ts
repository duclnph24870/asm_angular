import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from './data.service';
import { Table } from '../interfaces/table';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(
        private httpClient: HttpClient,
        private messService: NzMessageService,
        private dataService: DataService,
    ) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    getAllTables(): Observable<Table[]> {
        return this.httpClient.get<Table[]>(this.baseUrl + '/tables').pipe(catchError(this.handleError));
    }

    getTableTick() {
        this.dataService.user.subscribe(([{ tick }]) => {
            this.getAllTables().subscribe((res) => {
                const tickTableData = res.filter((item) => tick.includes(item.id));
                this.dataService.setTableTick(tickTableData);
            });
        });
    }
}
