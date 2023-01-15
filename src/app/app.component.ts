import { Component, OnInit } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { themes } from './core/constants/themes';
import { ThemeService } from './core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    currentTheme: string = '';

    currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
        map((isDarkTheme: boolean) => {
            const [lightTheme, darkTheme] = themes;

            this.currentTheme = isDarkTheme ? darkTheme.name : lightTheme.name;

            if (this.overlayContainer) {
                const overlayContainerClasses =
                    this.overlayContainer.getContainerElement().classList;
                const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
                    (item: string) => item.includes('-theme')
                );
                if (themeClassesToRemove.length) {
                    overlayContainerClasses.remove(...themeClassesToRemove);
                }
                overlayContainerClasses.add(this.currentTheme);
            }

            return this.currentTheme;
        })
    );

    constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) {}

    ngOnInit(): void {
        if (this.overlayContainer) {
            this.overlayContainer.getContainerElement().classList.add(this.currentTheme);
        }
    }
}
