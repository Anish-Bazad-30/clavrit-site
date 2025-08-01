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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { AiComponent } from './ai/ai.component';
import { SapSolutionsComponent } from './sap-solutions/sap-solutions.component';

const routes: Routes = [
{ path: '', component: LandingPageComponent, pathMatch: 'full' },
  {path:"sustainability", component:SustainabilityComponent},
  {
    path: 'sustainability/:section',
    component: SustainabilityComponent,
  },
  {path:"ai", component:AiComponent},
   {
    path: 'ai/:section',
    component: AiComponent,
  },
  {path:"about-us", component:AboutUsComponent},
  {path:"services", component:ServicesProvidedComponent},
  {path:"services/sap-solutions", component:SapSolutionsComponent},
   {path:"services/sap-solutions/:slug", component:DetailViewComponent},
  {path:"services/:slug", component:DetailViewComponent},
  
  {path:"career", component:CareerComponent},
  {path:"career/:slug", component:CareerDetailComponent},
  {path:"portfolio", component:PortfolioComponent},
  {path:"blog", component:BlogComponent},
  {path:"blog/:slug", component:BlogDetailComponent},
  {path:"our-partners", component:OurPartnersComponent},
  {path:"contact", component:ContactComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //scrollPositionRestoration: 'enabled',
     anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'  
  })],
 // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

