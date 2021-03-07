import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './auth/register/register.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './services/guards/auth.guard';
import {UnauthGuard} from './services/guards/unauth.guard';
import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptor} from './services/interceptors/token.interceptor';
import {ErrorInterceptor} from './services/interceptors/error.interceptor';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TaskCreatorComponent} from './main/task-creator/task-creator.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {MatSelectModule} from '@angular/material/select';
import {TaskPainterComponent} from './main/task-painter/task-painter.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AuthModule} from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        AppLayoutComponent,
        TaskCreatorComponent,
        TaskPainterComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        AccordionModule.forRoot(),
        MatCheckboxModule,
        ScrollingModule,
        AuthModule
    ],
    providers: [AuthGuard, UnauthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
