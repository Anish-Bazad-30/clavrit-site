import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogData: any;
  date!: string;
  recentBlogs: any;
  constructor(
    private blogService: BlogService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.blogService.sharedData$.subscribe(data => {
      if (data) {
        this.blogData = data;

      } else {
        // fallback: optionally load via route param or redirect
      }
    });
    this.blogService.recentBlogSharedData$.subscribe(data => {
      if (data) {
        this.recentBlogs = data;

      } else {
        // fallback: optionally load via route param or redirect
      }
    });
    this.date = this.formatDateArray(this.blogData.createdAt);
  }

  formatDateArray(dateArray: number[]): string {
    if (!dateArray || dateArray.length < 3) return '';
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); // Month is 0-based
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
