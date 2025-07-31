import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location
  ){}

  ngOnInit(): void {
    this.service = this.ourServicesService.getService();
  
  }
 onBack() {
  this.location.back();  //  This goes to the previous URL
}
}
