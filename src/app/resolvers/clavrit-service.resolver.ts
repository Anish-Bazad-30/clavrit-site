import { ResolveFn } from '@angular/router';
import { OurServicesService } from '../services/our-services.service';
import { inject } from '@angular/core';

export const clavritServiceResolver: ResolveFn<boolean> = (route, state) => {
const serviceService = inject(OurServicesService);
   let slug = route.paramMap.get('slug')!;

  // Replace "-" with " " to match DB value
  slug = slug.replace(/-/g, ' ');
  return serviceService.getOurServicesBySlug(slug); 
};
