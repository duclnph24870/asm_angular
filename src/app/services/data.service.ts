import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { Workspace } from '../interfaces/workspace';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private workspace = new BehaviorSubject<Workspace[]>([]);
    private workspaceTick = new BehaviorSubject<Workspace[]>([]);
    private userLogin = new BehaviorSubject<User[]>([]);
    currentWorkspace = this.workspace.asObservable();
    wpTick = this.workspaceTick.asObservable();
    user = this?.userLogin.asObservable();

    constructor() {}

    setWorkspace(data: Workspace[]) {
        this.workspace.next(data);
    }

    setWpTick(data: Workspace[]) {
        this.workspaceTick.next(data);
    }

    setUser(data: User[]) {
        this.userLogin.next(data);
    }
}
