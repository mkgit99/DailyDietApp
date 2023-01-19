import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FoodService } from 'src/app/data/services/food.service';
import { Food } from 'src/app/data/models/food';

interface FoodCategory {
    value: string;
}

@Component({
    selector: 'app-food-dialog',
    templateUrl: './food-dialog.component.html',
    styleUrls: ['./food-dialog.component.scss'],
})
export class FoodDialogComponent implements OnInit {
    food: Food = new Food();

    foodCategories: FoodCategory[] = [
        { value: 'Fruits & Vegetables' },
        { value: 'Dairy' },
        { value: 'Protein' },
        { value: 'Starchy food' },
        { value: 'Fat' },
    ];
    foodFormGroup!: FormGroup;
    actionBtn: string = 'Create';
    dialogTitle: string = 'Add new product';

    constructor(
        private dialogRef: MatDialogRef<FoodDialogComponent>,
        private formBuilder: FormBuilder,
        private foodService: FoodService,
        @Inject(MAT_DIALOG_DATA) public foodToEdit: Food
    ) {
        this.dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.buildForm();
        this.setFormEditValues();
    }

    private buildForm() {
        this.foodFormGroup = this.formBuilder.group({
            foodName: ['', Validators.required],
            brand: [],
            category: ['', Validators.required],
            calories: ['', Validators.required],
            totalFat: ['', Validators.required],
            saturated: [],
            totalCarb: ['', Validators.required],
            totalSugar: [],
            fiber: [],
            protein: ['', Validators.required],
            calcium: [],
        });
    }

    get fControl() {
        return this.foodFormGroup.controls;
    }

    private setFormEditValues() {
        if (this.foodToEdit) {
            this.actionBtn = 'Update';
            this.dialogTitle = 'Update product';
            this.food = this.foodToEdit;
            this.fControl['foodName'].setValue(this.food.foodName);
            this.fControl['brand'].setValue(this.food.brand);
            this.fControl['category'].setValue(this.food.category);
            this.fControl['calories'].setValue(this.food.calories);
            this.fControl['totalFat'].setValue(this.food.totalFat);
            this.fControl['saturated'].setValue(this.food.saturated);
            this.fControl['totalCarb'].setValue(this.food.totalCarb);
            this.fControl['totalSugar'].setValue(this.food.totalSugar);
            this.fControl['fiber'].setValue(this.food.fiber);
            this.fControl['protein'].setValue(this.food.protein);
            this.fControl['calcium'].setValue(this.food.calcium);
        }
    }

    createFood(food: Food) {
        if (this.foodFormGroup.valid) {
            food = this.foodFormGroup.value;
            this.foodService.createFood(food).subscribe({
                next: () => {
                    this.foodFormGroup.reset();
                    this.dialogRef.close('save');
                },
                error: () => {
                    alert('Error while adding the food');
                },
            });
        }
    }

    updateFood(food: Food) {
        food.foodName = this.fControl['foodName'].value;
        food.brand = this.fControl['brand'].value;
        food.category = this.fControl['category'].value;
        food.calories = this.fControl['calories'].value;
        food.totalFat = this.fControl['totalFat'].value;
        food.saturated = this.fControl['saturated'].value;
        food.totalCarb = this.fControl['totalCarb'].value;
        food.totalSugar = this.fControl['totalSugar'].value;
        food.fiber = this.fControl['fiber'].value;
        food.protein = this.fControl['protein'].value;
        food.calcium = this.fControl['calcium'].value;
        this.foodService.updateFood(food).subscribe({
            next: () => {
                this.foodFormGroup.reset();
                this.dialogRef.close('update');
            },
            error: () => {
                alert('Error while updating the record');
            },
        });
    }
}
