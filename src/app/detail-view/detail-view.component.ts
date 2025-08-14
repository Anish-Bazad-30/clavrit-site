import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit{
  service: any;
  

  constructor(
    private ourServicesService : OurServicesService,
    private router: Router,
    private location: Location,
    private route:ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ){}

  ngOnInit(): void {

     this.route.data.subscribe(data => {
    this.service = data['services'].data;
  });
    if (this.service) {
        // Set page title
        this.titleService.setTitle(this.service.metaTitle || this.service.title);

        // Set meta description
        this.metaService.updateTag({
          name: 'description',
          content: this.service.metaDescription || ''
        });
      }
  
  }
 onBack() {
  this.location.back();  //  This goes to the previous URL
}
}
