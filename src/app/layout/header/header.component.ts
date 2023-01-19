import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    title = 'Daily Diet App';

    navItems = [
        { link: '/home', title: 'Home' },
        { link: '/about', title: 'About' },
        { link: '/products', title: 'Products' },
        { link: '/your-diet', title: 'Your Diet' },
    ];

    public isDarkTheme$: Observable<boolean> = of(true);

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.isDarkTheme$ = this.themeService.getDarkTheme();
    }

    toggleTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
    }
}
