import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../common/header/header.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent,
    RegisterComponent, HeaderComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
