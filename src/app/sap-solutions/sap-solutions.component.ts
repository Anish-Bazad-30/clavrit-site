import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sap-solutions',
  templateUrl: './sap-solutions.component.html',
  styleUrls: ['./sap-solutions.component.scss']
})
export class SapSolutionsComponent implements OnInit {
  service: any;

  ourServices: any[] = [
  
  ];
  constructor(
    private ourServicesService : OurServicesService,
    private router: Router,
    private location: Location
  ){}

  ngOnInit(): void {
    // this.service = this.ourServicesService.getService();
    // console.log(this.service);
    this.fetchServices();
  }

  fetchServices(){
    this.ourServicesService.getAllServices().subscribe((res)=>{
     this.service = res.data.find((item: any) => item.title === "SAP Solutions");

      // console.log(this.service);
      this.ourServices = res.data.filter((item: any) => item.category == "SAP");
      // console.log(this.ourServices);
      

    })
  }
    readMore(service: any) {
    const rawTitle = service.slug;
    const slug = this.slugify(rawTitle);

    this.ourServicesService.setService(service);
   
      this.router.navigate(['/services', slug]);
    
    
  }
  //   slugify(text: string): string {
  //   return text
  //     .toLowerCase()
  //     .replace(/\s+/g, '-')        // Replace spaces with -
  //     .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
  //     .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  //     .replace(/^-+/, '')          // Trim - from start
  //     .replace(/-+$/, '');         // Trim - from end
  // }
    slugify(text: string): string {
  return text.replace(/\s+/g, '-');
}
  onBack() {
  this.location.back();  //  This goes to the previous URL
}
}
