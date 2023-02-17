import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from './data.service';

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
            return this.httpClient.get<User[]>(this.baseUrl + '/user?id=' + idUser).pipe(catchError(this.handleError));
        } else {
            this.messService.warning('Bạn cần đăng nhập để sử dụng chức năng này', { nzDuration: 3000 });
            this.router.navigate(['/login']);
            return;
        }
    }
}
