import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/interfaces/workspace';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    workspaces: Workspace[] = [];
    tickWorkspace: Workspace[] = [];
    isVisible: boolean = false;
    optionList: number[] = [1, 2, 3, 4, 5];
    constructor(private workspaceService: WorkspaceService) {}
    ngOnInit(): void {
        this.workspaceService.getWorkspace().subscribe((value) => {
            this.workspaces = value;

            this.workspaceService.getWorkspaceTick(1).subscribe(([{ tick }]) => {
                this.tickWorkspace = value.filter((item) => {
                    return tick.includes(item.id);
                });
            });
        });
    }

    showModal() {
        this.isVisible = true;
    }

    handleCancel() {
        this.isVisible = false;
    }
}
