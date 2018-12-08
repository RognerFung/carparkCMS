import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../_services/http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('fform') loginFormDirective;

    loginForm: FormGroup;
    user: any = {Email: undefined, Password: undefined};
    isIn: Boolean;

    formErrors = {
        'Email': '',
        'Password': ''
    }

    validationMessages = {
        'Email': {
            'required': 'Email is required',
            'Email': 'Email is not in the valid form'
        },
        'Password': {
            'required': 'Password is required'
        }
    }

    constructor(
        private httpService: HttpService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.checkLogin();
        this.createForm();
    }


    createForm() {
        this.loginForm = this.fb.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required]]
        });

        this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
    
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    checkLogin = function () {
        this.httpService.get('users/checkJWT').subscribe(
            data => {
                if (data.token) {
                    this.isIn = true;
                    this.httpService.storeCredentials(data);
                } else {
                    this.isIn = false;
                    this.httpService.destroyCredentials();
                }
                
            }, error => {
                this.httpService.handleError(error);
            }
        )
    }

    login = function () {
        this.user = this.loginForm.value;
        this.httpService.post('users/login', this.user).subscribe(
            data => {
                if (data.token) {
                    this.isIn = true;
                    this.httpService.storeCredentials(data);
                } else {
                    this.isIn = false;
                    this.httpService.destroyCredentials();
                }
            }, error => {
                this.httpService.handleError(error);
            }
        );

        this.loginForm.reset({
            Email: '',
            Password: ''
        });

        this.loginFormDirective.resetForm();

        // this.router.navigate(['/home']);
    }

    logout = function () {
        this.httpService.destroyCredentials();
        this.isIn = false;
        console.log("logout");
    }

}
