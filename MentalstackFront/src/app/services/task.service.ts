import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mission} from '../models/mission';
import {Answer} from '../models/answer';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    public saveTask(task: Mission): Observable<Answer<boolean>> {
        return this.http.post<Answer<boolean>>('api/Mission/Save', task);
    }

    public getAllById(): Observable<Answer<Mission[]>> {
        return this.http.get<Answer<Mission[]>>('api/Mission/GetAllById');
    }
}
