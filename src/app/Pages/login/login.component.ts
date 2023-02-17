import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    status: number = 0;
    loginForm = new FormGroup({
        email: new FormControl('', Validators.compose([Validators.email, Validators.maxLength(150)])),
        password: new FormControl(
            '',
            Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        ),
    });

    constructor(private messService: NzMessageService, private userService: UserService, private router: Router) {}

    onSubmit() {
        const mesId = this.messService.loading('Loading...', { nzDuration: 0 }).messageId;
        const { email, password } = this.loginForm.value;
        this.status = 0;

        this.userService.login(email, password).subscribe(
            (value) => {
                if (value.length === 0) {
                    this.messService.remove(mesId);
                    this.status = 1;
                    this.messService.warning('Tài khoản hoặc mật khẩu không chính xác');
                    return;
                }

                this.messService.remove(mesId);
                this.status = 0;
                this.router.navigate(['/']);
                this.messService.success('Đăng nhập thành công! Chào mừng bạn đến với Trello');
                // lưu id vào local
                localStorage.setItem('idUser', JSON.stringify(value[0].id));
            },
            (err) => {
                this.status = 1;
                this.messService.remove(mesId);
                this.messService.error('Lỗi server');
            },
        );
    }

    ngOnInit() {}
}
