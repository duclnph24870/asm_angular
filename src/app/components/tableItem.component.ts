import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../interfaces/table';

@Component({
    selector: 'app-tableItem',
    template: ` <div
            *ngIf="!create"
            class="w-full h-full rounded-[3px] p-2 cursor-pointer flex flex-col justify-between z-[1] relative"
            style="
                        background-image: url({{ data.bg }});
                        background-size: 100% 100%;
                        background-position: center;
                    "
        >
            <h1
                class="text-[16px] text-white font-bold"
                style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        "
            >
                {{ data.title }}
            </h1>
            <p class="text-[14px] text-white flex items-center">
                <span *ngIf="start" class="truncate w-[150px] block">
                    {{ data.description }}
                </span>
                <span
                    *ngIf="start"
                    nz-icon
                    nzType="star"
                    class="ml-2 text-[14px] relative top-[1px] text-[#ffc526]"
                    nzTheme="fill"
                ></span>
            </p>
        </div>
        <div *ngIf="create" class="flex justify-center items-center w-full h-full">Tạo bảng mới</div>`,
})
export class TableItemComponent implements OnInit {
    @Input() start: boolean = false;
    @Input() create: boolean = false;
    @Input() data: any = {};
    constructor() {}

    ngOnInit() {}
}
