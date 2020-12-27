import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastrSerivce: ToastrService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    localStorage.clear();
                    location.reload();
                } else if (error.status === 400) {
                    const errors = error.error.errors;
                    const title = error.error.title;
                    if (errors !== null)
                    {
                        for (const key in errors) {
                            const value = errors[key];
                            this.toastrSerivce.error(value, title);
                        }
                    }else{
                        this.toastrSerivce.error('An error occurred on the server');
                    }

                } else if (error.status === 500) {
                    this.toastrSerivce.error('An error occurred on the server');
                }
                return throwError(error);
            })
        );
    }
}
