import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    title = 'Daily Diet App';
    uname = 'Guest';

    navItems = [
        { link: '/home', title: 'Home' },
        { link: '/about', title: 'About' },
        { link: '/products', title: 'Products' },
        { link: '/your-diet', title: 'Your Diet' },
    ];

    public isDarkTheme$: Observable<boolean> = of(true);

    constructor(private themeService: ThemeService, public authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.isDarkTheme$ = this.themeService.getDarkTheme();
    }

    toggleTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
    }

    getLoggedUser() {
        this.authService.getLoggedUser().subscribe((username: string) => {
            this.uname = username;
        });
    }

    logout() {
		localStorage.removeItem('authToken');
		this.authService.isLoggedIn = false;
		this.router.parseUrl('/home');
	}
}
