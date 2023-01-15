import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FoodService } from 'src/app/data/services/food.service';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';

import { fadeOut } from 'src/app/shared/animations/animations';

@Component({
    selector: 'app-food-table',
    templateUrl: './food-table.component.html',
    styleUrls: ['./food-table.component.scss'],
    animations: [fadeOut],
})
export class FoodTableComponent implements OnInit {
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

    constructor(private dialog: MatDialog, private foodService: FoodService) {}

    ngOnInit(): void {
        this.getAllFoods();
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
        this.foodService.getFood().subscribe({
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
        this.foodService.deleteFood(id).subscribe({
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
