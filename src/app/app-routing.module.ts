import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';

const routes: Routes = [
  {path:"" , component: LandingPageComponent},
  {path:"about-us", component:AboutUsComponent},
  {path:"services", component:ServicesComponent},
  {path:"detail-view", component:DetailViewComponent},
  {path:"career", component:CareerComponent},
  {path:"career-detail", component:CareerDetailComponent},
  {path:"portfolio", component:PortfolioComponent},
  {path:"contact", component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
