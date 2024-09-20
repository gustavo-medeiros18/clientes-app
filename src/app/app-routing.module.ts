import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';

/**
 * Defines the routes for the application.
 *
 * - `/login`: Route for the login page, handled by `LoginComponent`.
 * - `/`: Root route, handled by `LayoutComponent` with child routes:
 *   - `/home`: Route for the home page, handled by `HomeComponent` and protected by `AuthGuard`.
 *
 * @constant
 * @type {Routes}
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
