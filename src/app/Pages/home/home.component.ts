import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/interfaces/table';
import { Workspace } from 'src/app/interfaces/workspace';
import { DataService } from 'src/app/services/data.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    dataWorkspace: any = [];
    tableTickData: Table[] = [];
    tableWpData: any = [];
    constructor(private dataService: DataService, private tableService: TableService) {
        // lấy ra các wp của user
        this.dataService.currentWorkspace.subscribe((res) => {
            this.dataWorkspace = res;
        });

        // lấy ra table tick user
        this.dataService.tableTickCurr.subscribe((res) => {
            this.tableTickData = res;
        });

        // lấy ra table cho từng workspace được hiển thị
        this.tableService.getTableWorkspace();
        this.dataService.tableWorkspaceData.subscribe((res) => {
            this.tableWpData = res;
        });
    }

    ngOnInit(): void {}
}
