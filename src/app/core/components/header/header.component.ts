import { Input, Component, OnInit } from '@angular/core';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    title = 'Daily Diet App';
    @Input() toggle: any;

    constructor() {}

    ngOnInit(): void {}
}
