import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private httpClient: HttpClient) {}

    getListPosts(): Observable<any> {
        return this.httpClient.get<any>('http://localhost:3000/workspace');
    }
}
