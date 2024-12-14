import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReverseAuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Homepage',
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'tag/:tag',
    component: HomeComponent,
  },
  {
    path: 'food/:id',
    component: FoodPageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ReverseAuthGuard], // Prevent logged in user to access this route
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReverseAuthGuard], // Prevent logged in user to access this route
  },
];
