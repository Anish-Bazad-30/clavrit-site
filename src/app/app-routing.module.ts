import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:"" , component: LandingPageComponent},
  {path:"about-us", component:AboutUsComponent},
  {path:"services", component:ServicesComponent},
  {path:"detail-view", component:DetailViewComponent},
  {path:"contact", component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
