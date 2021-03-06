import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Mission} from '../../models/mission';
import {TaskService} from '../../services/task.service';
import {Observable, Subscription} from 'rxjs';
import {MissionPriority} from '../../models/enums/mission-priority.enum';
import {TaskDescriptionInfo} from '../../models/task-description-info';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-task-painter',
    templateUrl: './task-painter.component.html',
    styleUrls: ['./task-painter.component.css']
})
export class TaskPainterComponent implements OnInit, OnDestroy {

    public tasks: Mission[] = [];
    public currentDate: string = new Date().toLocaleString().split(',')[0];
    private subscriptions: Subscription[] = [];

    constructor(public taskService: TaskService, public toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.taskService.getLastSavedTaskFromObservable().subscribe(t => {
            this.tasks = [...this.tasks, t];
        }));

        this.subscriptions.push(this.taskService.getCurrentTasks().subscribe(t => {
            console.log(t);
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

    public saveDescription(text: string, taskId: number): void {
        console.log(taskId, text);
        const taskDescriptionInfo: TaskDescriptionInfo = {
            taskId,
            text
        };
        this.taskService.saveDescriptionTask(taskDescriptionInfo).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        });
    }

    public deleteTask(task: Mission): void {
        this.taskService.deleteTask(task).subscribe(t => {
            if (t.success) {
                this.deleteTaskFromList(task);
                this.toastrService.success('Task deleted successfully');
            }
        }, error => {
            console.log(error);
        });
    }

    private deleteTaskFromList(task: Mission): void {
        let index = this.tasks.indexOf(task);
        let newTasks = this.tasks;
        newTasks.splice(index, 1);
        this.tasks = [...newTasks];
    }

    ngOnDestroy(): void {
    }

}
