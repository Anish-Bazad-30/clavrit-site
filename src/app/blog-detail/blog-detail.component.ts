import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
 
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
    private route: ActivatedRoute,
 
  ) { }
 
  ngOnInit(): void {

     this.route.data.subscribe(data => {
    this.blogData = data['blog'].data;
   
    
  });

 
  this.blogService.getBlogs().subscribe(data => {
    if (data) {
      const rowData = data.data;
      this.recentBlogs = Array.isArray(rowData[0]) ? rowData[0] : rowData;
      this.date = this.formatDateArray(this.blogData?.createdAt);
    } else {
      // fallback logic.
    }
  });
}
 
formatDateArray(dateArray: number[]): string {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return '';
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
 