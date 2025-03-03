import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { MainLayoutComponent } from '../components/layout/main/main-layout.component';
import { AuthLayoutComponent } from '../components/layout/auth/auth-layout.component';
import { HomeComponent } from '../components/home/home.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdminLayoutComponent } from '../components/layout/admin/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AdminGuard] }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
