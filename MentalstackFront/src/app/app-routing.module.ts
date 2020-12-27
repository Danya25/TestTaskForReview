import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import {AuthGuard} from './services/guards/auth.guard';
import {UnauthGuard} from './services/guards/unauth.guard';

const routes: Routes = [
    {
        path: 'auth', component: AuthComponent, canActivate: [UnauthGuard], children: [
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegisterComponent}]
    },
    {path: '', component: AppLayoutComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'auth/registration'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
