import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;

    constructor(private authService: AuthService, private toastrService: ToastrService, private route: Router) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=(?:.*[A-Z]){2,})[0-9a-zA-Z!@#$%^&*]{8,}')]),
            repassword: new FormControl('', [Validators.required])
        }, [this.passwordValidator]);
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

    // tslint:disable-next-line:typedef
    onSubmit() {
        const user: User = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            rePassword: this.form.get('repassword').value,
        };
        this.authService.registration(user).subscribe(t => {
            if (!t.success) {
                this.toastrService.error(t.exceptionMessage);
                return;
            }
            this.toastrService.success(t.value);
            this.route.navigate(['/auth/login']);
        });
    }

}
