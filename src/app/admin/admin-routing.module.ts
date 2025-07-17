import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { ContentListComponent } from './content-list/content-list.component';
import { AuthGuard } from '../auth.guard';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'forms/:type', component: FormsComponent, canActivate: [AuthGuard]},
  { path: 'content-list/:type', component: ContentListComponent,canActivate: [AuthGuard]},
  { path: 'edit-forms/:type', component: EditFormComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}