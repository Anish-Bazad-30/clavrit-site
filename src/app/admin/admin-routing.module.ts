import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { ContentListComponent } from './content-list/content-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forms/:type', component: FormsComponent },
  { path: 'content-list/:type', component: ContentListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}