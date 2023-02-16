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
import { LoginComponent } from './Pages/login/login.component';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent, HeaderComponent, HomeComponent, LayoutComponent, LoginComponent],
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
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
