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
import { NotFoundComponent } from './not-found/not-found.component';
import { blogResolver } from './resolvers/blog.resolver';
import { clavritServiceResolver } from './resolvers/clavrit-service.resolver';
import { jobDetailsResolver } from './resolvers/job-details.resolver';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: "sustainability", component: SustainabilityComponent },
  {
    path: 'sustainability/:section',
    component: SustainabilityComponent,
  },
  { path: "ai", component: AiComponent },
  {
    path: 'ai/:section',
    component: AiComponent,
  },
  { path: "about-us", component: AboutUsComponent },
  { path: "services", component: ServicesProvidedComponent },
  { path: "services/sap-solutions", component: SapSolutionsComponent },
  { path: "services/:slug", component: DetailViewComponent, resolve: { services: clavritServiceResolver } },
  { path: "career", component: CareerComponent },
  { path: "career/:slug", component: CareerDetailComponent ,resolve: { job: jobDetailsResolver }  },
  { path: "portfolio", component: PortfolioComponent },
  { path: 'portfolio/:section', component: PortfolioComponent } ,
  { path: "blogs", component: BlogComponent },
  { path: "blogs/:slug", component: BlogDetailComponent ,resolve: { blog: blogResolver } },
  { path: "our-partners", component: OurPartnersComponent },
  { path: "contact", component: ContactComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking'
})],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

