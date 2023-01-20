import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
		MatCardModule,
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
		MatCardModule,
    ],
})
export class MaterialModule {}
