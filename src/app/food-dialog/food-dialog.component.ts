import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

interface FoodCategory {
    value: string;
}

@Component({
    selector: 'app-food-dialog',
    templateUrl: './food-dialog.component.html',
    styleUrls: ['./food-dialog.component.scss'],
})
export class FoodDialogComponent implements OnInit {
    foodCategories: FoodCategory[] = [
        { value: 'Fruits & Vegetables' },
        { value: 'Dairy' },
        { value: 'Protein' },
        { value: 'Starchy food' },
        { value: 'Fat' },
    ];

    formGroup!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<FoodDialogComponent>,
        private formBuilder: FormBuilder,
        private api: ApiService
    ) {
        this.dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            foodName: ['', Validators.required],
            brand: [''],
            category: ['', Validators.required],
            calories: ['', Validators.required],
            totalFat: ['', Validators.required],
            saturated: [''],
            totalCarb: ['', Validators.required],
            totalSugar: [''],
            fiber: [''],
            protein: ['', Validators.required],
            calcium: [''],
        });
    }

    get f() {
        return this.formGroup.controls;
    }

    addFood() {
        if (this.formGroup.valid) {
            this.api.postFood(this.formGroup.value).subscribe({
                next: (res) => {
                    alert('Food added successfully');
                    this.formGroup.reset();
                    this.dialogRef.close('save');
                },
                error: () => {
                    alert('Error while adding the food');
                },
            });
        }
    }
}
