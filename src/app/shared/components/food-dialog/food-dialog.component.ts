import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../core/http/api.service';

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
    actionBtn: string = 'Save';

    constructor(
        private dialogRef: MatDialogRef<FoodDialogComponent>,
        private formBuilder: FormBuilder,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public editData: any
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

        if (this.editData) {
            this.actionBtn = 'Update';
            this.formGroup.controls['foodName'].setValue(this.editData.foodName);
            this.formGroup.controls['brand'].setValue(this.editData.brand);
            this.formGroup.controls['category'].setValue(this.editData.category);
            this.formGroup.controls['calories'].setValue(this.editData.calories);
            this.formGroup.controls['totalFat'].setValue(this.editData.totalFat);
            this.formGroup.controls['saturated'].setValue(this.editData.saturated);
            this.formGroup.controls['totalCarb'].setValue(this.editData.totalCarb);
            this.formGroup.controls['totalSugar'].setValue(this.editData.totalSugar);
            this.formGroup.controls['fiber'].setValue(this.editData.fiber);
            this.formGroup.controls['protein'].setValue(this.editData.protein);
            this.formGroup.controls['calcium'].setValue(this.editData.calcium);
        }
    }

    get fControl() {
        return this.formGroup.controls;
    }

    addFood() {
        if (!this.editData) {
            if (this.formGroup.valid) {
                this.api.postFood(this.formGroup.value).subscribe({
                    next: (res) => {
                        // alert('Food added successfully');
                        this.formGroup.reset();
                        this.dialogRef.close('save');
                    },
                    error: () => {
                        alert('Error while adding the food');
                    },
                });
            }
        } else {
            this.updateFood();
        }
    }

    updateFood() {
        this.api.putFood(this.formGroup.value, this.editData.id).subscribe({
            next: (res) => {
                // alert('Food updated successfully');
                this.formGroup.reset();
                this.dialogRef.close('update');
            },
            error: () => {
                alert('Error while updating the record');
            },
        });
    }
}
