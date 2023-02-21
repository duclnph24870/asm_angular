import { Component, OnInit } from '@angular/core';

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
            ></textarea>
            <button class="my-1 mr-2 hove:bg-primary rounded-[3px] px-3 py-1.5 bg-[#0079bf] text-white ">
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
    isShowForm: boolean = false;
    constructor() {}

    changeShowForm(isShow: boolean) {
        this.isShowForm = isShow;
    }
    ngOnInit() {}
}
