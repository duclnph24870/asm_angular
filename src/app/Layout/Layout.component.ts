import { Component, OnInit } from '@angular/core';

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
    constructor() {}

    ngOnInit() {}
}
