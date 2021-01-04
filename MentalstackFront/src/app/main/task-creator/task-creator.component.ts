import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MissionPriority} from '../../models/enums/mission-priority.enum';

@Component({
    selector: 'app-task-creator',
    templateUrl: './task-creator.component.html',
    styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {
    public form: FormGroup;

    constructor() {
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
        console.log(this.form.controls['priority']);
    }
}
