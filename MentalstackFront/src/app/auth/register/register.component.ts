import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private toastrService: ToastrService,
                private route: Router) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=(?:.*[A-Z]){2,})[0-9a-zA-Z!@#$%^&*]{8,}')]),
            repassword: new FormControl('', [Validators.required])
        }, [this.passwordValidator]);
    }

    public onSubmit(): void {
        const user: User = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            rePassword: this.form.get('repassword').value,
        };
        this.subscriptions.push(this.authService.registration(user).subscribe(t => {
            if (!t.success) {
                this.toastrService.error(t.exceptionMessage);
                return;
            }
            this.toastrService.success(t.value);
            this.route.navigate(['/auth/login']);
        }));
    }

    private passwordValidator(form: FormGroup): ValidationErrors {
        const rePassword = form.get('repassword').value;
        const password = form.get('password').value;
        if (rePassword !== password) {
            console.log('error');
            return {compare: true};
        }
        return null;
    }

    ngOnDestroy(): void {
    }

}
