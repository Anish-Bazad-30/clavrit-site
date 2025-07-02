import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {

  private selectedService: any;

  setService(data: any) {
    this.selectedService = data;
  }

  getService() {
    return this.selectedService;
  }
}
