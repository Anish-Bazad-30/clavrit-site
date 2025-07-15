import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ContentListComponent } from './content-list/content-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    FormsComponent,
    ContentListComponent,
    DeletePopupComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
