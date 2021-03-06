import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Mission} from '../models/mission';
import {Answer} from '../models/answer';
import {MissionPriority} from '../models/enums/mission-priority.enum';
import {TaskDescriptionInfo} from '../models/task-description-info';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    private tasksSubject: Subject<Mission> = new Subject<Mission>();

    public saveTask(task: Mission): Observable<Answer<boolean>> {
        return this.http.post<Answer<boolean>>('api/Mission/Save', task);
    }

    public getCurrentTasks(): Observable<Answer<Mission[]>> {
        return this.http.get<Answer<Mission[]>>('api/Mission/GetCurrentTasks');
    }

    public saveDescriptionTask(taskDescription: TaskDescriptionInfo): Observable<Answer<boolean>> {
        return this.http.post<Answer<boolean>>('api/Mission/SaveDescriptionTask', taskDescription);
    }

    public deleteTask(task: Mission): Observable<Answer<boolean>> {
        return this.http.post<Answer<boolean>>('api/Mission/Delete', task);
    }

    public getTaskColor(priority: MissionPriority): string {
        switch (+MissionPriority[priority]) {
            case MissionPriority.Neutral:
                return '#BBBBC7';
            case MissionPriority.Important:
                return '#F1A41F';
            case MissionPriority.Normal:
                return '#56CCF2';
            case MissionPriority.Urgently:
                return '#F24A3C';
            default:
                return '#000000';
        }
    }

    public getLastSavedTaskFromObservable(): Observable<Mission> {
        return this.tasksSubject;
    }

    public saveLastTaskIntoObservable(mission: Mission): void {
        this.tasksSubject.next(mission);
    }

}
