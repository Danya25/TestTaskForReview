import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistryDomSchemaChecker} from '@angular/compiler-cli/src/ngtsc/typecheck/src/dom';
import {RegisterComponent} from './register/register.component';
import {UnauthGuard} from '../services/guards/unauth.guard';
import {AuthService} from '../services/auth.service';

const routes: Routes = [
    {
        path: '', component: AuthComponent, canActivate: [UnauthGuard], children: [
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegisterComponent}
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthService]
})
export class AuthModule {
}
