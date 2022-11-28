import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface FoodCategory {
    value: string;
}

@Component({
    selector: 'app-food-dialog',
    templateUrl: './food-dialog.component.html',
    styleUrls: ['./food-dialog.component.scss'],
})
export class FoodDialogComponent implements OnInit {
    selectedCategory: string = '';

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
        private formBuilder: FormBuilder
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            foodName: ['', Validators.required],
            category: ['', Validators.required],
            calories: ['', Validators.required],
            totalFat: ['', Validators.required],
            totalCarb: ['', Validators.required],
            protein: ['', Validators.required],
        });
    }

    get f() {
        return this.formGroup.controls;
    }
}
