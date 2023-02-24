import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../interfaces/table';
import { Workspace } from '../interfaces/workspace';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private workspace = new BehaviorSubject<Workspace[]>([]);
    private tableTick = new BehaviorSubject<Table[]>([]);
    private userLogin = new BehaviorSubject<any>({});
    private tableWorkspace = new BehaviorSubject<any>([]);
    private visibleModalCreateTable = new BehaviorSubject<any>({
        status: false,
        id: null,
    });
    private dataModalEditCard = new BehaviorSubject<any>({
        status: false,
    });
    private widthAsideWorkspacePage = new BehaviorSubject<boolean>(true);
    private dataModalAddUser = new BehaviorSubject<any>({});

    tableWorkspaceData = this.tableWorkspace.asObservable();
    currentWorkspace = this.workspace.asObservable();
    tableTickCurr = this.tableTick.asObservable();
    user = this?.userLogin.asObservable();
    visibleModalCreateTableCurr = this.visibleModalCreateTable.asObservable();
    widthAsideWorkspace = this.widthAsideWorkspacePage.asObservable();
    dataModalEditCardCurr = this.dataModalEditCard.asObservable();
    dataModalAddUserCrr = this.dataModalAddUser.asObservable();

    constructor() {}

    setWorkspace(data: Workspace[]) {
        this.workspace.next(data);
    }

    setTableTick(data: Table[]) {
        this.tableTick.next(data);
    }

    setUser(data: any) {
        this.userLogin.next(data);
    }

    setTableWp(data: any) {
        this.tableWorkspace.next(data);
    }

    setModalCreateTable(data: any) {
        this.visibleModalCreateTable.next(data);
    }

    setWidthAsideWp(status: boolean) {
        this.widthAsideWorkspacePage.next(status);
    }

    setDataModalEditCard(data: any) {
        this.dataModalEditCard.next(data);
    }

    setDataModalAddUser(data: any) {
        this.dataModalAddUser.next(data);
    }
}
