import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-layout',
    template: `
        <div class="container">
            <app-header></app-header>
            <router-outlet></router-outlet>
        </div>
    `,
})
export class LayoutComponent implements OnInit {
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUser();
    }
}
