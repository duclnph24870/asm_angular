import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
    widthAside: boolean = true;
    constructor(private dataService: DataService) {
        this.dataService.widthAsideWorkspace.subscribe((res) => {
            this.widthAside = res;
        });
    }

    actionAside(action: boolean) {
        this.dataService.setWidthAsideWp(action);
    }

    showModalCreateTable() {
        this.dataService.setModalCreateTable({
            id: null,
            status: true,
        });
    }

    ngOnInit(): void {}
}
