import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
    }

    public getUserId(): number {
        return JSON.parse(localStorage.getItem('user')).userId;
    }
}
