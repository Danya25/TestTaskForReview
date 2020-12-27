import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

    public exitFromAccount(): void {
        localStorage.clear();
        location.reload();
    }
}
