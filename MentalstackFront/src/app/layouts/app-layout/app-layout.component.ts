import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Mission} from '../../models/mission';
import {Observable} from 'rxjs';
import {Answer} from '../../models/answer';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

    public opened = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    public changeSideNav(): void {
        this.opened = !this.opened;
    }

    public onResize(event: any): void {
        if (event.target.innerWidth <= 875) {
            this.opened = false;
        }
    }

    public exitFromAccount(): void {
        localStorage.clear();
        location.reload();
    }
}
