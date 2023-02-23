import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { getISOWeek } from 'date-fns';
import { CardService } from 'src/app/services/card.service';
import { ListService } from 'src/app/services/list.service';
import { User } from 'src/app/interfaces/user';
import { formatDate } from '@angular/common';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-edit-card-modal',
    templateUrl: './edit-card-modal.component.html',
    styleUrls: ['./edit-card-modal.component.scss'],
})
export class EditCardModalComponent implements OnInit {
    data: any = {};
    @Input() dataUserTable: any;
    @Output() updateListTable = new EventEmitter<any>();
    @Output() updateActivevity = new EventEmitter<any>();
    user: any = {};
    dateNow = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en-US');

    dataColorLabel: any = [
        {
            colorLight: '#d6ecd2',
            color: '#7bc86c',
        },
        {
            colorLight: '#FAF3C0',
            color: '#F5DD29',
        },
        {
            colorLight: '#FCE6C6',
            color: '#FFAF3F',
        },
        {
            colorLight: '#F5D3CE',
            color: '#EF7564',
        },
        {
            colorLight: '#EDDBF4',
            color: '#CD8DE5',
        },
        {
            colorLight: '#BCD9EA',
            color: '#5BA4CF',
        },
    ];
    editCardForm = new FormGroup({
        title: new FormControl(this.data?.title, Validators.required),
        list: new FormControl(null, Validators.required),
        table: new FormControl(null, Validators.required),
        members: new FormControl(null),
        status: new FormControl(null),
        label: new FormControl(''),
        date: new FormControl(null),
        successDate: new FormControl(null),
    });

    constructor(
        private dataService: DataService,
        private cardService: CardService,
        private listService: ListService,
        private tableService: TableService,
    ) {}

    ngOnInit(): void {
        this.dataService.dataModalEditCardCurr.subscribe((res) => {
            this.data = res;
            // khởi tạo giá trị cho form
            this.editCardForm.controls.title.setValue(res?.title || '');
            this.editCardForm.controls.list.setValue(res?.list || null);
            this.editCardForm.controls.table.setValue(res?.table || null);
            this.editCardForm.controls.label.setValue(res?.label || null);
            this.editCardForm.controls.date.setValue(res?.date || null);
            // gán giá trị ban đầu cho members
        });

        this.dataService.user.subscribe((res) => {
            this.user = res;
        });
    }

    handleCancel() {
        this.dataService.setDataModalEditCard({
            status: false,
        });
    }

    onSubmit() {
        if (this.editCardForm.valid) {
            const value: any = this.editCardForm.value;
            Object.keys(value).forEach((item: string) => {
                if (!value[item]) {
                    delete value[item];
                }
            });

            this.cardService.editCard(value, this.data.id).subscribe(
                async (res) => {
                    // thêm mới hoạt động
                    const dataActivity = {
                        table: this.data.table,
                        imgUser: this.user.avatar,
                        userName: this.user.userName,
                        act: `đã sửa thẻ ${this.data.title}`,
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
                    const newTable = await this.listService.getListAndCardByTable(this.data.table);
                    this.updateListTable.emit(newTable);

                    this.dataService.setDataModalEditCard({
                        status: false,
                    });
                },
                (err) => {
                    console.log('Sửa bị lỗi');
                },
            );
        }
    }
}
