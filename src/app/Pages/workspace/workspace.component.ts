import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Table } from 'src/app/interfaces/table';
import { User } from 'src/app/interfaces/user';
import { Workspace } from 'src/app/interfaces/workspace';
import { DataService } from 'src/app/services/data.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
    widthAside: boolean = true;
    idWp: number | null = null;
    dataWorkspace: any = {};
    tableData: Table[] = [];
    tickTableList: any = [];
    status: boolean = false;
    workspaceUser: Workspace[] = [];
    tableDataAddUser: Table[] = [];
    constructor(
        private dataService: DataService,
        private router: ActivatedRoute,
        private workspaceService: WorkspaceService,
        private tableService: TableService,
        private nav: Router,
        private messService: NzMessageService,
        private userService: UserService,
    ) {
        this.dataService.widthAsideWorkspace.subscribe((res) => {
            this.widthAside = res;
        });
    }

    formAddUser = new FormGroup({
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        workspace: new FormControl('', Validators.required),
        table: new FormControl(''),
    });

    handleCancel() {
        this.dataService.setDataModalAddUser({
            status: false,
        });
    }

    showModalAddUser() {
        this.dataService.setDataModalAddUser({
            status: true,
        });
    }

    onSubmit() {
        const valueForm = this.formAddUser.value;
        let dataWpOld: Workspace | undefined = undefined;
        let tableDataOld: Table | undefined = undefined;
        this.userService.checkEmail(valueForm.email).subscribe((check: User[]) => {
            if (check.length === 0) {
                this.messService.warning('Email b???n c???n m???i kh??ng t???n t???i');
                return;
            }
            if (!valueForm.table) {
                dataWpOld = this.workspaceUser.find((item) => item.id === Number(valueForm.workspace));
                if (dataWpOld?.members) {
                    // check xem ???? t???n t???i trong member ch??a
                    if (dataWpOld.members.includes(Number(check[0].id))) {
                        this.messService.warning('Ng?????i d??ng ???? t???n t???i trong kh??ng gian l??m vi???c');
                        return;
                    }
                    this.workspaceService
                        .addMember(
                            {
                                ...dataWpOld,
                                members: [...dataWpOld.members, Number(check[0].id)],
                            },
                            Number(valueForm.workspace),
                        )
                        .subscribe((res) => {
                            this.messService.success(
                                'Th??m ' + check[0].userName + ' v??o kh??ng gian l??m vi???c th??nh c??ng',
                            );
                            this.formAddUser.reset();
                        });
                }
            } else {
                dataWpOld = this.workspaceUser.find((item) => item.id === Number(valueForm.workspace));
                tableDataOld = this.tableDataAddUser.find((item) => item.id === Number(valueForm.table));

                if (dataWpOld?.members && tableDataOld?.members) {
                    // check xem ???? t???n t???i trong member ch??a
                    if (dataWpOld.members.includes(Number(check[0].id))) {
                        this.messService.warning('Ng?????i d??ng ???? t???n t???i trong kh??ng gian l??m vi???c');
                    } else {
                        this.workspaceService
                            .addMember(
                                {
                                    ...dataWpOld,
                                    members: [...dataWpOld.members, Number(check[0].id)],
                                },
                                Number(valueForm.workspace),
                            )
                            .subscribe((res) => {
                                this.messService.success(
                                    'Th??m ' + check[0].userName + ' v??o khong gian l??m vi???c th??nh c??ng',
                                );
                            });
                    }

                    // check xem ???? t???n t???i trong member ch??a
                    if (tableDataOld.members.includes(Number(check[0].id))) {
                        this.messService.warning('Ng?????i d??ng ???? t???n t???i trong b???ng');
                        return;
                    } else {
                        this.tableService
                            .addMember(
                                {
                                    ...tableDataOld,
                                    members: [...tableDataOld.members, Number(check[0].id)],
                                },
                                Number(valueForm.table),
                            )
                            .subscribe((res) => {
                                this.messService.success('Th??m ' + check[0].userName + ' v??o table th??nh c??ng');
                                this.formAddUser.reset();
                            });
                    }
                }
            }
        });
    }

    actionAside(action: boolean) {
        this.dataService.setWidthAsideWp(action);
    }

    showModalCreateTable() {
        this.dataService.setModalCreateTable({
            id: null,
            status: true,
        });
    }

    changeTickTable(idTable: any) {
        this.userService.changeStart(idTable);
    }

    ngOnInit(): void {
        const idWp = Number(this.router.snapshot.params['idWp']);
        this.idWp = idWp;

        // l???y ra data workspace
        this.workspaceService.getWorkspaceOne(idWp).subscribe((res) => {
            this.dataWorkspace = res[0];
        });
        // l???y ra table c???a wp
        this.tableService.getTableWpOne(idWp).subscribe((res) => {
            if (res.length === 0) {
                this.nav.navigate(['/']);
                this.messService.warning('Kh??ng gian l??m vi???c kh??ng t???n t???i ho???c ???? b??? x??a');
            }
            this.tableData = res;
        });

        // l???y ra danh s??ch b???ng ???? ????nh d???u
        this.dataService.user.subscribe(({ tick }) => {
            this.tickTableList = tick;
        });

        // l???y all workspace
        this.dataService.currentWorkspace.subscribe((res) => {
            this.workspaceUser = res;
        });

        // theo d??i s??? thay ?????i c???a control workspace
        this.formAddUser.controls.workspace.valueChanges.subscribe((res) => {
            if (!res) {
                this.tableDataAddUser = [];
                this.formAddUser.controls.table.setValue(null);
                return;
            }
            this.tableService.getTableWpOne(Number(res)).subscribe((data) => {
                this.tableDataAddUser = data;
            });
        });

        this.dataService.dataModalAddUserCrr.subscribe((res) => {
            this.status = res.status;
        });
    }
}
