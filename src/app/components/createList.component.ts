import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-createList',
    template: `
        <div
            *ngIf="!isShowForm"
            (click)="changeShowForm(true)"
            class="mb-1 flex items-center p-2 bg-primaryLight text-white cursor-pointer rounded-[3px]"
        >
            <span nz-icon nzType="plus" class="mr-2 text-white" nzTheme="outline"></span>
            Thêm danh sách khác
        </div>
        <div class="flex items-center flex-wrap bg-white rounded-[3px] p-2" *ngIf="isShowForm">
            <textarea
                class="w-full outline-none p-2 my-1 h-[54px] rounded-[3px]"
                placeholder="Nhập tiêu đề cho danh sách ..."
                style="overflow-wrap: break-word;border: 2px solid #337da7;"
            ></textarea>
            <button class="my-1 mr-2 hove:bg-primary rounded-[3px] px-3 py-1.5 bg-[#0079bf] text-white ">
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
    isShowForm: boolean = false;
    constructor() {}

    changeShowForm(isShow: boolean) {
        this.isShowForm = isShow;
    }
    ngOnInit() {}
}
