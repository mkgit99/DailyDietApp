import { Input, Component, OnInit } from '@angular/core';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    title = 'Daily Diet App';
    @Input() toggle: any;

    navItems = [
        { link: '/home', title: 'Home' },
        { link: '/about', title: 'About' },
        { link: '/products', title: 'Products' },
		{ link: '/your-diet', title: 'Your Diet' },
    ];

    constructor() {}

    ngOnInit(): void {}
}
