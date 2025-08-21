import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-provided',
  templateUrl: './services-provided.component.html',
  styleUrls: ['./services-provided.component.scss']
})
export class ServicesProvidedComponent implements OnInit{

  ourServices: any[] = [

  ];


  constructor(
    private ourServicesService: OurServicesService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.fetchServices();
  }



  fetchServices(){
    this.ourServicesService.getAllServices().subscribe((res)=>{
      this.ourServices = res.data.filter((item: any) => item.category !== "SAP");
      // console.log(this.ourServices);
      
    })
  }

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  readMore(service: any) {
    const rawTitle = service.slug;
    const slug = this.slugify(rawTitle);

    this.ourServicesService.setService(service);
    
    
    if (service.title == "SAP Solutions"){
    this.router.navigate(['/services/sap-solutions']); 
    }
    else{
      this.router.navigate(['/services', slug]);
    }
    
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start
      .replace(/-+$/, '');         // Trim - from end
  }

}
