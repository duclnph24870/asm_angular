import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { Table } from '../interfaces/table';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(private httpClient: HttpClient, private dataService: DataService) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    //GET

    getAllTables(): Observable<Table[]> {
        return this.httpClient.get<Table[]>(this.baseUrl + '/tables').pipe(catchError(this.handleError));
    }

    getTableWpOne(idWp: number) {
        return this.httpClient.get<Table[]>(this.baseUrl + '/tables?workspace=' + idWp);
    }

    getTableOne(id: number) {
        return this.httpClient.get<Table[]>(this.baseUrl + '/tables?id=' + id).pipe(catchError(this.handleError));
    }

    getTableTick() {
        this.dataService.user?.subscribe(({ tick }) => {
            this.getAllTables().subscribe((res) => {
                const tickTableData = res.filter((item) => tick?.includes(item.id));
                this.dataService.setTableTick(tickTableData);
            });
        });
    }

    getActivityTracking(idTable: number) {
        return this.httpClient
            .get(this.baseUrl + '/activityTracking?table=' + idTable + '&_sort=id&_order=desc')
            .pipe(catchError(this.handleError));
    }

    getTableWorkspace() {
        this.getAllTables().subscribe((res) => {
            this.dataService.currentWorkspace.subscribe((data) => {
                const idData = data.map((item) => item.id);

                // lấy ra tất cả table của từng wp
                const tableData = res.filter((item) => {
                    return idData.includes(item.workspace);
                });

                const dataTable = data.map((item) => {
                    let tableWp = [];
                    tableWp = tableData.filter((itemTb) => itemTb.workspace === item.id);

                    return {
                        ...item,
                        tableData: tableWp,
                    };
                });

                this.dataService.setTableWp(dataTable);
            });
        });
    }

    // POST
    createTable(data: any): Observable<Table[]> {
        return this.httpClient.post<Table[]>(this.baseUrl + '/tables', data).pipe(catchError(this.handleError));
    }

    addActivityTracking(data: any) {
        return this.httpClient.post<[]>(this.baseUrl + '/activityTracking', data).pipe(catchError(this.handleError));
    }

    //DELETE
    deleteTable(id: number) {
        // xóa bảng, xóa hoạt động , xóa card, xóa list, xóa trong tick user
        return this.httpClient.delete<Table[]>(this.baseUrl + '/tables/' + id).pipe(catchError(this.handleError));
    }

    // PUT
    addMember(data: any, idTable: number) {
        return this.httpClient.put<Table[]>(this.baseUrl + '/tables/' + idTable, data);
    }
}
