import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/Layout.component';

import { HeaderComponent } from './Layout/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { LoginComponent } from './Pages/login/login.component';
import { RegistorComponent } from './Pages/registor/registor.component';
import { WorkspaceItemComponent } from './components/workspaceItem.component';
import { TableItemComponent } from './components/tableItem.component';
import { WorkspaceComponent } from './Pages/workspace/workspace.component';
import { TableComponent } from './components/table/table.component';
import { CreateCardComponent } from './components/createCard.component';
import { CreateListComponent } from './components/createList.component';
import { CardComponent } from './components/card/card.component';

import { DateFnsModule } from 'ngx-date-fns';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LayoutComponent,
        LoginComponent,
        RegistorComponent,
        TableItemComponent,
        WorkspaceItemComponent,
        WorkspaceComponent,
        TableComponent,
        CreateCardComponent,
        CreateListComponent,
        CardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NzButtonModule,
        NzIconModule,
        NzDropDownModule,
        NzModalModule,
        NzSelectModule,
        ReactiveFormsModule,
        NzMessageModule,
        NzInputModule,
        NzRadioModule,
        NzPopconfirmModule,
        NzAvatarModule,
        DateFnsModule.forRoot(),
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
