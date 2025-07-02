import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit{
  service: any;

  constructor(
    private ourServicesService : OurServicesService,
  ){}

  ngOnInit(): void {
    this.service = this.ourServicesService.getService();
  
  }

}
