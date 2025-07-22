import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

   recentBlogs: any;

  constructor(
      private blogService: BlogService,
      private router: Router,
      
    ) { }
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((res) => {
      const rawData = res.data;
      this.recentBlogs = Array.isArray(rawData[0]) ? rawData[0] : rawData;
    });
  }

    viewBlog(blog: any) {
    const rawTitle = blog.title;
    const slug = this.slugify(rawTitle);
    this.blogService.setData(blog);
    this.router.navigate(['/blog', slug]);
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
