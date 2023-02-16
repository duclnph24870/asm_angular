import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from './workspace.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private workspace = new BehaviorSubject<Workspace[]>([]);
    private workspaceTick = new BehaviorSubject<Workspace[]>([]);
    currentWorkspace = this.workspace.asObservable();
    wpTick = this.workspaceTick.asObservable();

    constructor() {}

    setWorkspace(data: Workspace[]) {
        this.workspace.next(data);
    }

    setWpTick(data: Workspace[]) {
        this.workspaceTick.next(data);
    }
}
