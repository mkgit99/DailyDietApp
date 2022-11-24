import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface FoodCategory {
  value: string;
}

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.scss']
})
export class FoodDialogComponent implements OnInit {
 
  selectedCategory: string = '';

  foodCategories: FoodCategory[] = [
    {value: 'Fruits & Vegetables'},
    {value: 'Dairy'},
    {value: 'Protein'},
    {value: 'Starchy food'},
    {value: 'Fat'},
  ];

  constructor(private dialogRef: MatDialogRef<FoodDialogComponent>){
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }
}
