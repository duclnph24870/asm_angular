import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Workspace } from 'src/app/interfaces/workspace';
import { CategoryService } from 'src/app/services/category.service';
import { WorkspaceService } from '../../services/workspace.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Table } from 'src/app/interfaces/table';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() searchVl: string = '';
    workspaces: Workspace[] = [];
    category: Category[] = [];
    tickTable: Table[] = [];
    isVisible: boolean = false;
    status: number = -1;
    searchResult: Workspace[] = [];
    userLogin: User[] = [];
    constructor(
        private workspaceService: WorkspaceService,
        private categoryService: CategoryService,
        private messService: NzMessageService,
        private dataSerice: DataService,
        private userService: UserService,
        private tableService: TableService,
    ) {}
    createWorkspace = new FormGroup({
        name: new FormControl(
            '',
            Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        ),
        category: new FormControl(null, Validators.required),
        description: new FormControl(''),
    });

    ngOnInit(): void {
        // Lấy ra tất cả các wp
        this.workspaceService.getWorkspace();
        this.dataSerice.currentWorkspace.subscribe((res) => {
            this.workspaces = res;
        });
        // Lấy ra các wp đã đánh dấu
        this.tableService.getTableTick();
        this.dataSerice.tableTickCurr.subscribe((res) => {
            this.tickTable = res;
        });

        // lấy thông tin user login
        this.dataSerice.user.subscribe((res) => {
            this.userLogin = res;
        });
    }

    showModal() {
        this.isVisible = true;
        // lấy ra dữ liệu của category
        this.categoryService.getCategory().subscribe((value) => {
            this.category = value;
        });
    }

    handleCancel() {
        this.isVisible = false;
    }

    onSubmit() {
        this.status = 0;
        const loading = this.messService.loading('loading ...').messageId;
        this.workspaceService
            .createWorkspace({
                ...this.createWorkspace.value,
                members: [],
            })
            .subscribe(
                (value) => {
                    this.status = -1;
                    this.messService.remove(loading);
                    this.messService.success('Thêm workspace thành công!', { nzDuration: 3000 });
                    this.createWorkspace.reset();
                    // thêm wp đã thêm vào menu

                    this.workspaceService.getWorkspace();
                    this.dataSerice.currentWorkspace.subscribe((res) => {
                        this.workspaces = res;
                    });
                },
                (error) => {
                    this.status = -1;
                    this.messService.error(error.message, { nzDuration: 3000 });
                },
            );
    }

    handleSearch() {
        this.workspaceService.searchWorkspace(this.searchVl).subscribe(
            (result) => {
                this.searchResult = result;
                if (result.length === 0) {
                    this.messService.warning('Không có kết quả phù hợp!');
                }
            },
            (error) => {
                this.messService.error('Lỗi server');
            },
        );
    }

    handleLogout() {
        this.userService.logout();
    }
}
