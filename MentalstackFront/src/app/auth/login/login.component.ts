import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private toastrService: ToastrService,
                private route: Router) {
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=(?:.*[A-Z]){2,})[0-9a-zA-Z!@#$%^&*]{8,}')])
        });
    }

    public onSubmit(): void {
        const user: User = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            rePassword: this.form.get('password').value,
        };
        this.subscriptions.push(this.authService.login(user).subscribe(t => {
            if (!t.success) {
                this.toastrService.error(t.exceptionMessage);
                return;
            }
            localStorage.setItem(
                'user', JSON.stringify({name: user.email, token: t.value.token, userId: t.value.userId}),
            );
            this.toastrService.success('Log in was successful');
            this.route.navigate(['']);
        }));
    }

    ngOnDestroy(): void {
    }

}
