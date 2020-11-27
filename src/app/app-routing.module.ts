import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ],
    // canActivate: [AuthGuard]
  },
  // Route for Auth layout with login, reset password
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'pages/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
