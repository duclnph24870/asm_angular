import { formatDate } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardService } from '../services/card.service';
import { DataService } from '../services/data.service';
import { ListService } from '../services/list.service';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-createCard',
    template: `
        <div
            *ngIf="!isShowForm"
            (click)="changeShowForm(true)"
            class="my-1 flex items-center text-subTitle p-2 cursor-pointer hover:bg-[#dadbe2] rounded-[3px]"
        >
            <span nz-icon nzType="plus" class="mr-2 text-subTitle" nzTheme="outline"></span>
            Thêm thẻ
        </div>
        <div class="flex items-center flex-wrap" *ngIf="isShowForm">
            <textarea
                class="w-full outline-none p-2 my-1 h-[54px] rounded-[3px]"
                placeholder="Nhập tiêu đề cho thẻ này..."
                style="overflow-wrap: break-word;"
                [(ngModel)]="contentValue"
            ></textarea>
            <button
                (click)="submit()"
                class="my-1 mr-2 hove:bg-primary rounded-[3px] px-3 py-1.5 bg-[#0079bf] text-white "
            >
                Thêm thẻ
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
export class CreateCardComponent implements OnInit {
    @Input() contentValue: string = '';
    @Input() idList: any = null;
    @Input() listTitle: any = null;
    @Input() idTable: any = null;
    @Output() updateListTable = new EventEmitter();
    @Output() updateActivevity = new EventEmitter<any>();
    dateNow = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en-US');
    user: any = {};

    isShowForm: boolean = false;
    constructor(
        private dataService: DataService,
        private listService: ListService,
        private cardService: CardService,
        private messService: NzMessageService,
        private tableService: TableService,
    ) {}

    changeShowForm(isShow: boolean) {
        this.isShowForm = isShow;
    }

    submit() {
        this.cardService
            .createCard({
                table: this.idTable,
                list: this.idList,
                title: this.contentValue,
            })
            .subscribe(
                async (res) => {
                    // thêm mới hoạt động
                    const dataActivity = {
                        table: this.idTable,
                        imgUser: this.user.avatar,
                        userName: this.user.userName,
                        act: `đã thêm một thẻ vào danh sách ${this.listTitle}`,
                        time: this.dateNow,
                    };
                    this.tableService.addActivityTracking(dataActivity).subscribe(
                        (res) => {
                            this.updateActivevity.emit(dataActivity);
                        },
                        (err) => {
                            console.log('lỗi');
                        },
                    );
                    const newListTable = await this.listService.getListAndCardByTable(this.idTable);
                    this.updateListTable.emit(newListTable);
                },
                (error) => {
                    this.messService.error('Đã xảy ra lỗi, vui lòng thử lại');
                },
            );
    }
    ngOnInit() {
        this.dataService.user.subscribe((user) => {
            this.user = user;
        });
    }
}
