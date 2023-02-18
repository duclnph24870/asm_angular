import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-workspaceItem',
    template: `
        <div
            nz-dropdown
            [nzDropdownMenu]="menu1"
            nzTrigger="click"
            class="w-full hover:bg-hover rounded-[3px] px-2 py-1 flex items-center mt-[12px] cursor-pointer"
        >
            <div
                class="img min-w-[32px] w-[32px] h-[32px] rounded-[3px] shadow-sm bg-[#006e49] text-[20px] flex items-center justify-center text-white font-bold text-center"
            >
                {{ data?.name.charAt(0) }}
            </div>
            <p
                class="w-full ml-[8px] font-bold text-[14px]"
                style="
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        "
            >
                {{ data?.name }}
            </p>
            <span nz-icon nzType="down" nzTheme="outline" class="ml-2"></span>
        </div>

        <nz-dropdown-menu class="" #menu1="nzDropdownMenu">
            <div nz-menu class="shadow-none flex flex-col">
                <div
                    class="flex items-center rounded-[3px] pl-[35px] text-subTitle py-1.5 mb-0.5 hover:bg-hover cursor-pointer"
                >
                    <span nz-icon nzType="appstore" class="mr-2" nzTheme="outline"></span> Bảng
                </div>
                <div
                    class="flex items-center rounded-[3px] text-subTitle pl-[35px] py-1.5 mb-0.5 hover:bg-hover cursor-pointer"
                >
                    <span nz-icon nzType="bg-colors" class="mr-2" nzTheme="outline"></span> Hình nền
                </div>
                <div
                    class="flex items-center rounded-[3px] text-subTitle pl-[35px] py-1.5 mb-0.5 hover:bg-hover cursor-pointer"
                >
                    <span nz-icon nzType="usergroup-add" class="mr-2" nzTheme="outline"></span> Thành viên
                    <span nz-icon nzType="plus" class="ml-auto mr-1.5 text-[14px]" nzTheme="outline"></span>
                </div>
                <div
                    class="flex items-center rounded-[3px] text-subTitle pl-[35px] py-1.5 mb-0.5 hover:bg-hover cursor-pointer"
                >
                    <span nz-icon nzType="setting" class="mr-2" nzTheme="outline"></span> Cài đặt
                </div>
            </div>
        </nz-dropdown-menu>
    `,
})
export class WorkspaceItemComponent implements OnInit {
    @Input() data: any = {};
    constructor() {}

    ngOnInit() {}
}
