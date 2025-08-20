import { ResolveFn } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { inject } from '@angular/core';

export const jobDetailsResolver: ResolveFn<boolean> = (route, state) => {
    const jobService = inject(JobsService);
    let slug = route.paramMap.get('slug')!;
  
    // Replace "-" with " " to match DB value
    slug = slug.replace(/-/g, ' ');
    return jobService.getjobBySlug(slug); 
};
