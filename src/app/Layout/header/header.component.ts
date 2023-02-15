import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(private testService: TestService) {}
    ngOnInit(): void {
        this.testService.getListPosts().subscribe((value) => {
            console.log(value);
        });
    }
}
