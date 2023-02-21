import { Component } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    menuTableShow: boolean = false;

    constructor() {}
    changeShowMenu(isShow: boolean) {
        this.menuTableShow = isShow;
    }
}
