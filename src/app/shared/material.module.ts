import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

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
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
    ],
})
export class MaterialModule {}
