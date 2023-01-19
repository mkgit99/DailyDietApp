import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FoodService } from 'src/app/data/services/food.service';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';

import { fadeOut } from 'src/app/shared/animations/animations';
import { Food } from 'src/app/data/models/food';

@Component({
    selector: 'app-food-table',
    templateUrl: './food-table.component.html',
    styleUrls: ['./food-table.component.scss'],
    animations: [fadeOut],
})
export class FoodTableComponent implements OnInit {
    foodDataSource!: MatTableDataSource<Food>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

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

    constructor(private dialog: MatDialog, private foodService: FoodService) {}

    ngOnInit(): void {
        this.getFoods();
    }

    getFoods() {
        this.foodService.getFoods().subscribe({
            next: (result: Food[]) => {
                this.foodDataSource = new MatTableDataSource<Food>(result);
                this.foodDataSource.paginator = this.paginator;
                this.foodDataSource.sort = this.sort;
            },
            error: () => {
                alert('Error while fetching the records');
            },
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
                    this.getFoods();
                }
            });
    }

    editFood(food: Food) {
        this.dialog
            .open(FoodDialogComponent, {
                width: '30%',
                minWidth: '400px',
                data: food,
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'update') {
                    this.getFoods();
                }
            });
    }

    deleteFood(id: number) {
        this.foodService.deleteFood(id).subscribe({
            next: (res) => {
                this.getFoods();
            },
            error: (err) => {
                alert('Error while deleting the records');
            },
        });
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
    //     this.foodService.getAllFood().subscribe({
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
    //     this.foodService.deleteFood(id).subscribe({
    //         next: (res) => {
    //             // alert('Product deleted successfully');
    //             this.getAllFoods();
    //         },
    //         error: (err) => {
    //             alert('Error while deleting the records');
    //         },
    //     });
    // }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.foodDataSource.filter = filterValue.trim().toLowerCase();

        if (this.foodDataSource.paginator) {
            this.foodDataSource.paginator.firstPage();
        }
    }
}
