import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { List } from 'src/app/interfaces/list';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    menuTableShow: boolean = false;
    dataTable: any = {};
    idTable: number = -1;
    tickTable: any = [];
    activityTrackingData: any = [];
    listByTableData: any = [];
    userTableData: any = {};

    constructor(
        private router: ActivatedRoute,
        private tableService: TableService,
        private nav: Router,
        private messService: NzMessageService,
        private dataService: DataService,
        private userService: UserService,
        private listService: ListService,
    ) {}

    // lắng nghe sự thay đổi về data của list khi tạo mới
    changeListByTable(data: List[]) {
        this.listByTableData = data;
    }

    changeListActivity(data: any) {
        this.activityTrackingData.push(data);
    }

    // ============

    changeShowMenu(isShow: boolean) {
        this.menuTableShow = isShow;
    }

    changeTickTable() {
        this.userService.changeStart(this.idTable);
    }

    handleDeleteTable() {
        this.tableService.deleteTable(this.idTable).subscribe(
            (res) => {
                this.nav.navigate(['/']);
                this.messService.success('Xóa bảng thành công!');
            },
            (error) => {
                this.messService.error('Xảy ra lỗi, xóa không thành công!');
            },
        );
    }

    ngOnInit(): void {
        this.router.params.subscribe(({ id }) => {
            this.idTable = Number(id);
            this.tableService.getTableOne(id).subscribe((res) => {
                if (res.length === 0) {
                    this.nav.navigate(['/']);
                    this.messService.warning('Bảng không tồn tại hoặc đã bị xóa');
                    return;
                }

                this.dataTable = res[0];
            });

            // lấy ra hoạt động của table
            this.tableService.getActivityTracking(id).subscribe((res) => {
                this.activityTrackingData = res;
            });

            // lấy ra list của table
            this.listService.getListAndCardByTable(id).then((res) => {
                this.listByTableData = res;
            });

            // Lấy ra danh sách user của bảng
            this.userService.getUserByTable(id).then((res) => {
                this.userTableData = res[0];
            });
        });

        this.dataService.user.subscribe(({ tick }) => {
            this.tickTable = tick;
        });
    }
}
