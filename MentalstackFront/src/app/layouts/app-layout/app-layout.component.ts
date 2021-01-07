import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Mission} from '../../models/mission';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

    public opened = true;
    public tasks: Mission[] = [];

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.taskService.getAllById().subscribe(t => {
            console.log(t);
        });
    }

    public exitFromAccount(): void {
        localStorage.clear();
        location.reload();
    }
}
