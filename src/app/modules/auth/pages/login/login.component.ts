import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup;
    hide = true;
	user = new User();

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm() {
        this.loginFormGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get fControl() {
        return this.loginFormGroup.controls;
    }

    login(user: User) {
        if (this.loginFormGroup.valid) {
            user = this.loginFormGroup.value;
            this.authService.login(user).subscribe({
                next: (token: string) => {
                    this.loginFormGroup.reset();
                    localStorage.setItem('authToken', token);
                },
                error: () => {
                    alert('Error while logging');
                },
            });
        }
    }
}
