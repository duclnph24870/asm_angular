import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-registor',
    templateUrl: './registor.component.html',
    styleUrls: ['./registor.component.scss'],
})
export class RegistorComponent implements OnInit {
    status: number = 0;
    registorForm = new FormGroup({
        userName: new FormControl(
            '',
            Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
        ),
        email: new FormControl('', Validators.compose([Validators.email, Validators.maxLength(150)])),
        password: new FormControl(
            '',
            Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        ),
        avatar: new FormControl(
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x319/1ae4e99da27ed4f7fbcb064985b0aeca/photo-1588075592405-d3d4f0846961.jpg',
        ),
        tick: new FormControl([]),
        role: new FormControl(0),
    });

    constructor(private messService: NzMessageService, private userService: UserService) {}

    onSubmit() {
        const mesId = this.messService.loading('Loading...', { nzDuration: 0 }).messageId;
        const email = this.registorForm.get('email')?.value;
        const data = this.registorForm.value;
        this.status = 0;

        this.userService.checkEmail(email).subscribe(
            (value) => {
                if (value.length > 0) {
                    this.messService.remove(mesId);
                    this.status = 1;

                    this.messService.warning('Email bạn dùng đăng ký đã tồn tại');
                    return;
                }

                this.userService.registor(data).subscribe(
                    (res) => {
                        this.messService.success('Đăng ký tài khoản thành công');
                        this.messService.remove(mesId);
                        this.registorForm.reset();
                    },
                    (err) => {
                        this.messService.error('Lỗi server');
                        this.messService.remove(mesId);
                        this.status = 1;
                    },
                );
            },
            (err) => {
                this.status = 1;

                this.messService.error('Lỗi server');
            },
        );
    }

    ngOnInit() {}
}
