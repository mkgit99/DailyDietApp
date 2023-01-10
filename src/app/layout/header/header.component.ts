import { Input, Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { DialogAnimationsExampleDialogComponent } from 'src/app/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
