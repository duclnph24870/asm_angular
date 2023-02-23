import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-avatarGroup',
    template: `
        <nz-avatar-group class="max-w-[100px] mr-2" *ngIf="users && users.length <= 3">
            <nz-avatar
                *ngFor="let itemUser of users"
                class="rounded-[50%] w-[28px] h-[28px] flex items-center justify-center"
                nzIcon="user"
                [nzSrc]="itemUser.avatar"
            ></nz-avatar>
        </nz-avatar-group>
        <nz-avatar-group class="max-w-[100px] mr-2" *ngIf="users && users.length > 3">
            <nz-avatar
                class="rounded-[50%] w-[28px] h-[28px] flex items-center justify-center"
                nzIcon="user"
                [nzSrc]="users[0].avatar"
            ></nz-avatar>
            <nz-avatar
                class="rounded-[50%] w-[28px] h-[28px] flex items-center justify-center"
                nzIcon="user"
                [nzSrc]="users[1].avatar"
            ></nz-avatar>
            <nz-avatar
                class="rounded-[50%] w-[28px] h-[28px] flex items-center justify-center"
                nzIcon="user"
                [nzSrc]="users[2].avatar"
            ></nz-avatar>
            <nz-avatar
                class="rounded-[50%] w-[28px] h-[28px] flex items-center justify-center"
                style="background-color: #fde3cf; color: #f56a00"
                [nzText]="'+' + (users.length - 3)"
            ></nz-avatar>
        </nz-avatar-group>
    `,
})
export class AvatarGroupComponent implements OnInit {
    @Input() users: any = [];
    constructor() {}

    ngOnInit() {}
}
