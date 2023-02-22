import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { LayoutComponent } from './Layout/Layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistorComponent } from './Pages/registor/registor.component';
import { WorkspaceComponent } from './Pages/workspace/workspace.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'workspace/:idWp',
                component: WorkspaceComponent,
                children: [{ path: ':id', component: TableComponent }],
            },
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registor',
        component: RegistorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
