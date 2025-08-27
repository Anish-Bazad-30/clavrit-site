import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogList: any[] = [];
  tags: any[] = [];
  paginatedList: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  selectedTag: string | null = null;
  tagList: string[] = [];
  filteredBlogList: any[] = [];
  loading: boolean = true; 

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchBlogs();
  }

masterBlogList: any[] = []; // permanent sorted master copy

fetchBlogs() {
  this.loading = true;
  this.blogService.getBlogs().subscribe((res) => {
    const rawData = res.data;
    const allBlogs = Array.isArray(rawData[0]) ? rawData[0] : rawData;

    // sort once, store in master
    this.masterBlogList = allBlogs
      .filter((b: any) => b.publish?.toLowerCase() === 'published')
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // working copy
    this.blogList = [...this.masterBlogList];
    this.filteredBlogList = [...this.masterBlogList];

    // collect tags
    const tagSet = new Set<string>();
    this.masterBlogList.forEach((blog) => blog.tags?.forEach((tag: string) => tagSet.add(tag)));
    this.tagList = Array.from(tagSet);

    this.currentPage = 1;
    this.calculatePagination();
    this.updatePaginatedList();

    this.blogService.setRecentBlogData(this.masterBlogList);
    this.loading = false;
  });
}

filterByTag(tag: string) {
  this.selectedTag = tag;
  this.filteredBlogList = this.masterBlogList.filter((blog) =>
    blog.tags?.includes(tag)
  );
  this.currentPage = 1;
  this.calculatePagination();
  this.updatePaginatedList();
}

clearFilter() {
  this.selectedTag = null;
  this.filteredBlogList = [...this.masterBlogList]; // reset from master, not blogList
  this.currentPage = 1;
  this.calculatePagination();
  this.updatePaginatedList();
}


  // Generic pagination calculator
  private calculatePagination() {
    this.totalPages = Math.ceil(this.filteredBlogList.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    if (this.currentPage > this.totalPages) this.currentPage = 1; // reset if overflow
  }

trackByBlogId(index: number, blog: any): string {
  return blog.id || blog.slug || index; // prefer unique id if available
}


  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Always paginate from filtered list (not raw blogList)
    this.paginatedList = this.filteredBlogList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedList();
    this.scrollToTop();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedList();
      this.scrollToTop();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedList();
      this.scrollToTop();
    }
  }

  

  viewBlog(blog: any) {
    const rawTitle = blog.slug;
    const slug = this.slugify(rawTitle);
    this.blogService.setData(blog);
    this.router.navigate(['/blogs', slug]);
  }

  // slugify(text: string): string {
  //   return text
  //     .toLowerCase()
  //     .replace(/\s+/g, '-')        // Replace spaces with -
  //     .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
  //     .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  //     .replace(/^-+/, '')          // Trim - from start
  //     .replace(/-+$/, '');         // Trim - from end
  // }

  slugify(text: string): string {
  return text.replace(/\s+/g, '-');
}

  scrollToTop() {
    const section = document.getElementById('blog-list-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
