import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/interfaces/workspace';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    dataWorkspace: Workspace[] = [];
    constructor(private dataService: DataService) {
        this.dataService.currentWorkspace.subscribe((res) => {
            this.dataWorkspace = res;
        });
    }

    ngOnInit(): void {}
}
