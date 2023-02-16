import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Workspace } from 'src/app/interfaces/workspace';
import { CategoryService } from 'src/app/services/category.service';
import { WorkspaceService } from '../../services/workspace.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    workspaces: Workspace[] = [];
    category: Category[] = [];
    tickWorkspace: Workspace[] = [];
    isVisible: boolean = false;
    optionList: number[] = [1, 2, 3, 4, 5];
    status: number = -1;
    constructor(
        private workspaceService: WorkspaceService,
        private categoryService: CategoryService,
        private messService: NzMessageService,
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
        // Lấy ra dữ liệu của menu
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
                image: '',
            })
            .subscribe(
                (value) => {
                    this.status = -1;
                    this.messService.remove(loading);
                    this.messService.success('Thêm workspace thành công!', { nzDuration: 3000 });
                    this.createWorkspace.reset();
                },
                (error) => {
                    this.status = -1;
                    this.messService.error(error.message, { nzDuration: 3000 });
                },
            );
    }
}
