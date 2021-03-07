import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../models/answer';
import {UserInfo} from '../models/user-info';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public registration(user: User): Observable<Answer<string>> {
        return this.http.post<Answer<string>>('api/Auth/Registration', user);
    }
    public login(user: User): Observable<Answer<UserInfo>> {
        return this.http.post<Answer<UserInfo>>('api/Auth/Login', user);
    }
}
