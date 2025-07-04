import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { ServicesProvidedComponent } from './services-provided/services-provided.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';

const routes: Routes = [
  {path:"" , component: LandingPageComponent},
  {path:"about-us", component:AboutUsComponent},
  {path:"services", component:ServicesProvidedComponent},
  {path:"detail-view", component:DetailViewComponent},
  {path:"career", component:CareerComponent},
  {path:"career-detail", component:CareerDetailComponent},
  {path:"portfolio", component:PortfolioComponent},
  {path:"blog", component:BlogComponent},
  {path:"blog-detail", component:BlogDetailComponent},
  {path:"our-partners", component:OurPartnersComponent},
  {path:"contact", component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
