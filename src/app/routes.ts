import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'customer',  component: CustomerComponent },
    { path: 'home',  component: CustomerComponent },
    { path: 'login',  component: LoginComponent },
    { path: 'signup',  component: CustomerComponent },
    { path: 'cars',  component: CustomerComponent },
    { path: 'cars/:carId',  component: CustomerComponent },
    { path: 'cars/:carId/bid',  component: CustomerComponent },
    { path: 'publish',  component: CustomerComponent },
    { path: 'favorite',     component: CustomerComponent },
    { path: '', redirectTo: '/customer', pathMatch: 'full' }
]