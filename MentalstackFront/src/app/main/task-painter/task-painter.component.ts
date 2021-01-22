import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Mission} from '../../models/mission';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';
import {MissionPriority} from '../../models/enums/mission-priority.enum';

@Component({
    selector: 'app-task-painter',
    templateUrl: './task-painter.component.html',
    styleUrls: ['./task-painter.component.css']
})
export class TaskPainterComponent implements OnInit, OnDestroy {

    public tasks: Mission[];
    private subscriptions: Subscription[] = [];
    public currentDate: string = new Date().toLocaleString().split(',')[0];

    constructor(public taskService: TaskService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.taskService.getAllById().subscribe(t => {
            this.tasks = t.value.sort((a, b) => {
                let date1 = new Date(a.endDate).getTime();
                let date2 = new Date(b.endDate).getTime();
                return date1 - date2;
            });
            console.log(this.tasks);
        }, error => {
            console.warn(error);
            this.tasks = [];
        }));
    }

    ngOnDestroy(): void {
    }

}
