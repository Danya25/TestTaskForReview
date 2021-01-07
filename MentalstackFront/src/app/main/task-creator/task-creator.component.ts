import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MissionPriority} from '../../models/enums/mission-priority.enum';
import {User} from '../../models/user';
import {Mission} from '../../models/mission';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-task-creator',
    templateUrl: './task-creator.component.html',
    styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {
    public form: FormGroup;

    constructor(private taskService: TaskService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            priority: new FormControl(MissionPriority[MissionPriority.Neutral], [Validators.required]),
            endTime: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])
        });
    }

    public setPriority(priority: number): void {
        this.form.controls['priority'].setValue(MissionPriority[priority]);
    }

    public onSubmit() {
        const task: Mission = {
            title: this.form.get('title').value,
            priority: this.form.get('priority').value,
            endTime: this.form.get('endTime').value,
            endDate: this.form.get('endDate').value,
            description: '',
        };
        this.taskService.saveTask(task).subscribe(t => {
            console.log(t);
        });
    }
}
