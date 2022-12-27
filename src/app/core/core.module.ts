import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FooterComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        FormsModule,
		ReactiveFormsModule
    ],
    exports: [FooterComponent],
})
export class CoreModule {}
