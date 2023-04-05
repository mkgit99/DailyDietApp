import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/models/user';

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
    user = new User();

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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

    register(user: User) {
        if (this.registerFormGroup.valid) {
            user.username = this.fControl['userName'].value;
			user.password = this.fControl['password'].value;
            this.authService.register(user).subscribe({
                next: () => {
                    this.registerFormGroup.reset();
                    alert('Registration successful');
                },
                error: () => {
                    alert('Error while registering');
                },
            });
        }
    }
}
