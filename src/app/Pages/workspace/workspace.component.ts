import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Table } from 'src/app/interfaces/table';
import { DataService } from 'src/app/services/data.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
    widthAside: boolean = true;
    idWp: number | null = null;
    dataWorkspace: any = {};
    tableData: Table[] = [];
    tickTableList: any = [];
    constructor(
        private dataService: DataService,
        private router: ActivatedRoute,
        private workspaceService: WorkspaceService,
        private tableService: TableService,
        private nav: Router,
        private messService: NzMessageService,
        private userService: UserService,
    ) {
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

    changeTickTable(idTable: any) {
        this.userService.changeStart(idTable);
    }

    ngOnInit(): void {
        const idWp = Number(this.router.snapshot.params['idWp']);
        this.idWp = idWp;

        // lấy ra data workspace
        this.workspaceService.getWorkspaceOne(idWp).subscribe((res) => {
            this.dataWorkspace = res[0];
        });
        // lấy ra table của wp
        this.tableService.getTableWpOne(idWp).subscribe((res) => {
            if (res.length === 0) {
                this.nav.navigate(['/']);
                this.messService.warning('Không gian làm việc không tồn tại hoặc đã bị xóa');
            }
            this.tableData = res;
        });

        // lấy ra danh sách bảng đã đánh dấu
        this.dataService.user.subscribe(({ tick }) => {
            this.tickTableList = tick;
        });
    }
}
