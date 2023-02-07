import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export default class Validation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl.errors['matching']) {
                return null;
            }

            if (control?.value !== checkControl?.value) {
                controls.get(checkControlName)?.setErrors({ matching: true });
                return { matching: true };
            } else {
                return null;
            }
        };
    }
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerFormGroup!: FormGroup;
    hide = true;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm() {
        this.registerFormGroup = this.formBuilder.group(
            {
                userName: ['', Validators.required],
                password: ['', Validators.required, Validators.minLength(6)],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [Validation.match('password', 'confirmPassword')],
            }
        );
    }

    get fControl(): { [key: string]: AbstractControl } {
        return this.registerFormGroup.controls;
    }
}
