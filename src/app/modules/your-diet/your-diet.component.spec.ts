import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDietComponent } from './your-diet.component';

describe('YourDietComponent', () => {
    let component: YourDietComponent;
    let fixture: ComponentFixture<YourDietComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [YourDietComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(YourDietComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
