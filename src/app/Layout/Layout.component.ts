import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Workspace } from '../interfaces/workspace';
import { AppService } from '../services/app.service';
import { DataService } from '../services/data.service';
import { TableService } from '../services/table.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
    dataModal: any = {
        status: false,
        id: null,
    };
    status: number = 1;
    bgData: string[] = [];
    dataWorkspace: Workspace[] = [];
    idUser: number = Number(localStorage.getItem('idUser'));
    createTableForm = new FormGroup({
        bg: new FormControl('https://images.unsplash.com/photo-1676619487386-54adbabb8f3a', Validators.required),
        title: new FormControl('', Validators.required),
        workspace: new FormControl(this.dataModal.id, Validators.required),
        description: new FormControl(''),
        members: new FormControl([this.idUser]),
    });
    constructor(
        private userService: UserService,
        private messService: NzMessageService,
        private dataService: DataService,
        private appService: AppService,
        private tableService: TableService,
    ) {
        this.dataService.visibleModalCreateTableCurr.subscribe((res) => {
            this.dataModal = res;
        });

        this.bgData = this.appService.getBg();

        this.dataService.currentWorkspace.subscribe((res) => {
            this.dataWorkspace = res;
        });
    }

    ngOnInit() {
        this.userService.getUser();
    }

    onSubmit() {
        this.status = 0;
        this.tableService.createTable(this.createTableForm.value).subscribe(
            (res) => {
                this.status = 1;
                this.messService.success('Tạo bảng thành công');
                this.createTableForm.reset();
                this.tableService.getTableWorkspace();
            },
            (err) => {
                this.status = 1;
                this.messService.error('Không thể kết nối với server');
            },
        );
    }

    handleCancel() {
        this.dataService.setModalCreateTable({
            status: false,
            id: null,
        });
    }
}
