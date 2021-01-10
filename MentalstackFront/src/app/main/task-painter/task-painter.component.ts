import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Mission} from '../../models/mission';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-task-painter',
    templateUrl: './task-painter.component.html',
    styleUrls: ['./task-painter.component.css']
})
export class TaskPainterComponent implements OnInit, OnDestroy {

    public tasks: Mission[];
    private subscriptions: Subscription[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.taskService.getAllById().subscribe(t => {
            this.tasks = t.value;
            console.log(this.tasks);
        }));
    }

    ngOnDestroy(): void {
    }

}
