import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { ServicesProvidedComponent } from './services-provided/services-provided.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { HttpClientModule } from '@angular/common/http';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { AiComponent } from './ai/ai.component';
import { RecentBlogPipe } from './pipes/recent-blog.pipe';
import { SapSolutionsComponent } from './sap-solutions/sap-solutions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CustomPackagesComponent } from './custom-packages/custom-packages.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AboutUsComponent,
    DetailViewComponent,
    ContactComponent,
    CareerComponent,
    PortfolioComponent,
    CareerDetailComponent,
    ServicesProvidedComponent,
    BlogComponent,
    BlogDetailComponent,
    OurPartnersComponent,
    SustainabilityComponent,
    AiComponent,
    RecentBlogPipe,
    SapSolutionsComponent,
    NotFoundComponent,
    CustomPackagesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
