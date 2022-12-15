import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FoodDialogComponent } from './components/food-dialog/food-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
    // exports: [FoodDialogComponent],
})
export class SharedModule {}
