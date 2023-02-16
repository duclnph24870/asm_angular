import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workspace } from '../interfaces/workspace';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    baseUrl: string = 'http://localhost:3000';
    listTick: number[] = [];
    constructor(private httpClient: HttpClient) {}

    getWorkspace(): Observable<Workspace[]> {
        return this.httpClient.get<Workspace[]>(this.baseUrl + '/workspace', {
            responseType: 'json',
        });
    }

    getWorkspaceTick(id: number): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl + '/user?id=' + id);
    }
}
