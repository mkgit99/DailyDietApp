import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './core/http/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeOut } from './shared/animations/animations';

import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { themes } from './core/constants/themes';
import { ThemeService } from './core/services/theme.service';
// import { FoodDialogComponent } from './shared/components/food-dialog/food-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeOut],
})
export class AppComponent implements OnInit {
    // displayedColumns: string[] = [
    //     'foodName',
    //     'brand',
    //     'category',
    //     'calories',
    //     'totalFat',
    //     'totalCarb',
    //     'protein',
    //     'action',
    // ];
    // dataSource!: MatTableDataSource<any>;

    // @ViewChild(MatPaginator) paginator!: MatPaginator;
    // @ViewChild(MatSort) sort!: MatSort;

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

    constructor(
        private themeService: ThemeService,
        private overlayContainer: OverlayContainer // private dialog: MatDialog,
    ) // private api: ApiService
    {}

    ngOnInit(): void {
        // this.getAllFoods();

        if (this.overlayContainer) {
            this.overlayContainer.getContainerElement().classList.add(this.currentTheme);
        }
    }

    // openFoodDialog(): void {
    //     this.dialog
    //         .open(FoodDialogComponent, {
    //             width: '30%',
    //             minWidth: '400px',
    //         })
    //         .afterClosed()
    //         .subscribe((val) => {
    //             if (val === 'save') {
    //                 this.getAllFoods();
    //             }
    //         });
    // }

    // getAllFoods() {
    //     this.api.getFood().subscribe({
    //         next: (res) => {
    //             this.dataSource = new MatTableDataSource(res);
    //             this.dataSource.paginator = this.paginator;
    //             this.dataSource.sort = this.sort;
    //         },
    //         error: (err) => {
    //             alert('Error while fetching the records');
    //         },
    //     });
    // }

    // editFood(row: any) {
    //     this.dialog
    //         .open(FoodDialogComponent, {
    //             width: '30%',
    //             minWidth: '400px',
    //             data: row,
    //         })
    //         .afterClosed()
    //         .subscribe((val) => {
    //             if (val === 'update') {
    //                 this.getAllFoods();
    //             }
    //         });
    // }

    // deleteFood(id: number) {
    //     this.api.deleteFood(id).subscribe({
    //         next: (res) => {
    //             // alert('Product deleted successfully');
    //             this.getAllFoods();
    //         },
    //         error: (err) => {
    //             alert('Error while deleting the records');
    //         },
    //     });
    // }

    // applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();

    //     if (this.dataSource.paginator) {
    //         this.dataSource.paginator.firstPage();
    //     }
    // }
}
