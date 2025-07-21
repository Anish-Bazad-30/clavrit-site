import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recentBlog'
})
export class RecentBlogPipe implements PipeTransform {
transform(blogs: any[], count: number = 4): any[] {
    if (!Array.isArray(blogs)) return [];

    return blogs
      .sort((a, b) => {
       const dateA = new Date(Date.UTC.apply(null, a.createdAt)).getTime();
const dateB = new Date(Date.UTC.apply(null, b.createdAt)).getTime();
        return dateB - dateA;
      })
      .slice(0, count);
  }

}
