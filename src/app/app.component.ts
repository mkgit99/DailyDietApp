import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FoodDialogComponent } from './food-dialog/food-dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeOut, blub} from './animations/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeOut, blub],
})
export class AppComponent implements OnInit {
    title = 'Daily Diet App';

    @HostBinding('class') className = '';

    toggleControl = new FormControl(false);
    displayedColumns: string[] = [
        'foodName',
        'brand',
        'category',
        'calories',
        'totalFat',
        'totalCarb',
        'protein',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private dialog: MatDialog,
        private overlay: OverlayContainer,
        private api: ApiService
    ) {}

    ngOnInit(): void {
        this.toggleDarkMode();
        this.getAllFoods();
    }

    toggleDarkMode(): void {
        this.toggleControl.valueChanges.subscribe((darkMode) => {
            const darkClassName = 'darkMode';
            this.className = darkMode ? darkClassName : '';
            if (darkMode) {
                this.overlay.getContainerElement().classList.add(darkClassName);
            } else {
                this.overlay.getContainerElement().classList.remove(darkClassName);
            }
        });
    }

    openFoodDialog(): void {
        this.dialog
            .open(FoodDialogComponent, {
                width: '30%',
                minWidth: '400px',
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'save') {
                    this.getAllFoods();
                }
            });
    }

    getAllFoods() {
        this.api.getFood().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                alert('Error while fetching the records');
            },
        });
    }

    editFood(row: any) {
        this.dialog
            .open(FoodDialogComponent, {
                width: '30%',
                minWidth: '400px',
                data: row,
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'update') {
                    this.getAllFoods();
                }
            });
    }

    deleteFood(id: number) {
        this.api.deleteFood(id).subscribe({
            next: (res) => {
                // alert('Product deleted successfully');
                this.getAllFoods();
            },
            error: (err) => {
                alert('Error while deleting the records');
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
