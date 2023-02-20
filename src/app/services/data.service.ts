import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../interfaces/table';
import { User } from '../interfaces/user';
import { Workspace } from '../interfaces/workspace';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private workspace = new BehaviorSubject<Workspace[]>([]);
    private tableTick = new BehaviorSubject<Table[]>([]);
    private userLogin = new BehaviorSubject<User[]>([]);
    private tableWorkspace = new BehaviorSubject<any>([]);
    tableWorkspaceData = this.tableWorkspace.asObservable();
    currentWorkspace = this.workspace.asObservable();
    tableTickCurr = this.tableTick.asObservable();
    user = this?.userLogin.asObservable();

    constructor() {}

    setWorkspace(data: Workspace[]) {
        this.workspace.next(data);
    }

    setTableTick(data: Table[]) {
        this.tableTick.next(data);
    }

    setUser(data: User[]) {
        this.userLogin.next(data);
    }

    setTableWp(data: any) {
        this.tableWorkspace.next(data);
    }
}
