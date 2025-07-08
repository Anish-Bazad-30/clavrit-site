import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ContentListComponent } from './content-list/content-list.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    FormsComponent,
    ContentListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
