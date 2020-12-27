import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../models/answer';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public registration(user: User): Observable<Answer<string>> {
        return this.http.post<Answer<string>>('api/Auth/Registration', user);
    }
    login(user: User): Observable<Answer<string>> {
        return this.http.post<Answer<string>>('api/Auth/Login', user);
    }
}
