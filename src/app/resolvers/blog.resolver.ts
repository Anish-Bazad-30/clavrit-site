import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { BlogService } from '../services/blog.service';

export const blogResolver: ResolveFn<any> = (route, state) => {
  const blogService = inject(BlogService);
  let slug = route.paramMap.get('slug')!;

  // Replace "-" with " " to match DB value
  slug = slug.replace(/-/g, ' ');
  return blogService.getBlogBySlug(slug); // returns Observable
};
