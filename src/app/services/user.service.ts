import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from './data.service';
import { TableService } from './table.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private messService: NzMessageService,
        private dataService: DataService,
        private tableService: TableService,
    ) {}

    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    checkEmail(email: any) {
        return this.httpClient.get<[]>(this.baseUrl + '/user?email=' + email).pipe(catchError(this.handleError));
    }

    registor(data: any): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl + '/user', data).pipe(catchError(this.handleError));
    }

    login(email: any, password: any): Observable<User[]> {
        return this.httpClient
            .get<User[]>(this.baseUrl + `/user?email=${email}&password=${password}`)
            .pipe(catchError(this.handleError));
    }

    logout() {
        localStorage.removeItem('idUser');
        this.router.navigate(['/login']);
        this.messService.success('Đăng xuất thành công!');
    }

    getUser() {
        const idUser = localStorage.getItem('idUser');
        if (idUser) {
            return this.httpClient
                .get<User[]>(this.baseUrl + '/user?id=' + idUser)
                .pipe(catchError(this.handleError))
                .subscribe((res) => {
                    this.dataService.setUser(res[0]);
                });
        } else {
            this.messService.warning('Bạn cần đăng nhập để sử dụng chức năng này', { nzDuration: 3000 });
            this.router.navigate(['/login']);
            return;
        }
    }

    getTableAndUser(idTable: number): Observable<any> {
        return forkJoin([this.tableService.getTableOne(idTable), this.httpClient.get<User[]>(this.baseUrl + '/user')]);
    }

    async getUserByTable(idTable: number) {
        const userTable = await this.getTableAndUser(idTable)
            .pipe(
                map(([tables, users]) => {
                    const newUserTable = tables.map((table: any) => {
                        let user = users.filter((itemU: any) => table.members.includes(itemU.id));
                        return {
                            table: table.id,
                            users: user,
                        };
                    });

                    return newUserTable;
                }),
            )
            .toPromise();

        return userTable;
    }

    // PUT
    changeStart(idTable: number) {
        let idUser = localStorage.getItem('idUser');

        this.httpClient.get<User[]>(this.baseUrl + '/user?id=' + idUser).subscribe(([data]) => {
            const tick: number[] = data.tick;
            let check = tick.includes(idTable);
            let newTick: number[] = [];
            let newData = null;

            if (check) {
                newTick = tick.filter((item) => {
                    return item !== idTable;
                });
            } else {
                newTick = [...tick, idTable];
            }

            newData = {
                ...data,
                tick: newTick,
            };

            // sửa
            this.httpClient
                .put<User[]>(this.baseUrl + '/user/' + idUser, newData)
                .pipe(catchError(this.handleError))
                .subscribe(
                    (res) => {
                        this.getUser();
                    },
                    (error) => {
                        this.messService.error('Đã xảy ra lỗi, vui lòng thử lại');
                    },
                );
        });
    }
}
