import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { List } from '../interfaces/list';
import { ListService } from '../services/list.service';

@Component({
    selector: 'app-createList',
    template: `
        <div
            *ngIf="!isShowForm"
            (click)="changeShowForm(true)"
            class="mb-1 flex items-center p-2 bg-primaryLight text-white cursor-pointer rounded-[3px]  w-[264px] min-w-[264px] mr-3 ml-1.5"
        >
            <span nz-icon nzType="plus" class="mr-2 text-white" nzTheme="outline"></span>
            Thêm danh sách khác
        </div>
        <div
            class="flex items-center flex-wrap bg-white w-[264px] min-w-[264px] rounded-[3px] p-2 mr-3 ml-1.5"
            *ngIf="isShowForm"
        >
            <input
                type="text"
                class="w-full outline-none p-2 my-1 h-[35px] rounded-[3px]"
                placeholder="Nhập tiêu đề cho danh sách ..."
                style="overflow-wrap: break-word;border: 2px solid #337da7;"
                [(ngModel)]="titleValue"
            />
            <button
                (click)="submit()"
                class="my-1 mr-2 hove:bg-primary rounded-[3px] px-3 py-1.5 bg-[#0079bf] text-white "
            >
                Thêm danh sách
            </button>
            <span
                nz-icon
                nzType="close"
                (click)="changeShowForm(false)"
                class="text-[16px] cursor-pointer"
                nzTheme="outline"
            ></span>
        </div>
    `,
})
export class CreateListComponent implements OnInit {
    @Input() idTable: number = -1;
    @Input() titleValue: string = '';
    @Output() updateListTable = new EventEmitter<List[]>();
    isShowForm: boolean = false;
    constructor(private messService: NzMessageService, private listService: ListService) {}

    changeShowForm(isShow: boolean) {
        this.isShowForm = isShow;
    }

    submit() {
        if (this.titleValue.length < 3) {
            this.messService.warning('Tiêu đề quá ngắn');
            return;
        } else if (this.titleValue.length > 500) {
            this.messService.warning('Tiêu đề quá dài');
            return;
        }
        this.listService.createList(this.idTable, this.titleValue.trim()).subscribe(
            (res) => {
                this.listService.getListByTable(this.idTable).subscribe((res) => {
                    this.updateListTable.emit(res);
                    this.isShowForm = false;
                    this.titleValue = '';
                });
            },
            (err) => {
                this.messService.error('Đã xảy ra lỗi, vui lòng thử lại');
            },
        );
    }

    ngOnInit() {}
}
