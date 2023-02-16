import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workspace } from '../interfaces/workspace';
import { User } from '../interfaces/user';
import { DataService } from './data.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService,
        private messService: NzMessageService,
    ) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // GET
    getWorkspace() {
        this.httpClient
            .get<Workspace[]>(this.baseUrl + '/workspace', {
                responseType: 'json',
            })
            .pipe(catchError(this.handleError))
            .subscribe(
                (res) => {
                    this.dataService.setWorkspace(res);
                },
                (err) => {
                    this.messService.error('Lỗi server');
                },
            );
    }

    getWorkspaceTick(id: number): void {
        this.getWorkspace();

        this.httpClient
            .get<User[]>(this.baseUrl + '/user?id=' + id)
            .pipe(catchError(this.handleError))
            .subscribe(
                ([{ tick }]) => {
                    this.dataService.currentWorkspace.subscribe((res) => {
                        const tickData = res.filter((item) => {
                            return tick.includes(item.id);
                        });

                        this.dataService.setWpTick(tickData);
                    });
                },
                (err) => {
                    this.messService.error('Lỗi server');
                },
            );
    }

    searchWorkspace(value: string): Observable<Workspace[]> {
        return this.httpClient
            .get<Workspace[]>(this.baseUrl + '/workspace?q=' + value)
            .pipe(catchError(this.handleError));
    }

    // POST
    createWorkspace(data: any): Observable<Workspace> {
        return this.httpClient.post<Workspace>(this.baseUrl + '/workspace', data).pipe(catchError(this.handleError));
    }
}
