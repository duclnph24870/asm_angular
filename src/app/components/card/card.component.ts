import { formatDate } from '@angular/common';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() data: any = {};

    constructor(private dataService: DataService, private cardService: CardService) {}

    showModalEditCard() {
        this.dataService.setDataModalEditCard({
            status: true,
            ...this.data,
        });
    }

    completeCard(check: boolean) {
        if (check) {
            this.cardService
                .completeCard(
                    {
                        ...this.data,
                        success: !this.data.success,
                    },
                    this.data.id,
                )
                .subscribe((res) => {
                    this.data.success = !this.data.success;
                });
        }
    }

    checkProcess(date: string) {
        const now = new Date();
        const date1 = new Date(date);

        return now.getTime() < date1.getTime();
    }

    formatDateConfig(date: string) {
        return formatDate(date, 'dd/MM/yyyy', 'en-US');
    }
}
