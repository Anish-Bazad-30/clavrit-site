import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  //  blogList = [

  //     {
  //       id: 31,
  //       title: "Baseliner",
  //       subtitle: "This is the baseliner project blog.",
  //       authorName: "Anish ",
  //       summary: "This is the baseliner project.",
  //       content: "This is the dummy content for the baseliner project.",
  //       advantages: "Advantages of the baseliner projects",
  //       disadvantages: "Disadvantages of the baseliner project",
  //       conclusion: "This is a good app",
  //       imageUrl: [
  //         "https://clavrit.com/upload/backlog/images/07ac444f-7be3-4794-aa29-d0c3a3882f92_web.webp"
  //       ],
  //       tags: ["AI"],
  //       createdAt: [2025, 7, 21, 6, 58, 8],
  //       updatedAt: [2025, 7, 21, 6, 58, 8]
  //     },
  //     {
  //       id: 31,
  //       title: "Motolens",
  //       subtitle: "This is the Motolens project blog.",
  //       authorName: "Anish ",
  //       summary: "This is the Motolens project.",
  //       content: "This is the dummy content for the Motolens project.",
  //       advantages: "Advantages of the Motolens projects",
  //       disadvantages: "Disadvantages of the Motolens project",
  //       conclusion: "This is a good app",
  //       imageUrl: [
  //         "https://clavrit.com/upload/backlog/images/07ac444f-7be3-4794-aa29-d0c3a3882f92_web.webp"
  //       ],
  //       tags: ["AI"],
  //       createdAt: [2025, 7, 21, 6, 58, 8],
  //       updatedAt: [2025, 7, 21, 6, 58, 8]
  //     },

  //     // add more blogs here
  //   ];
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

  constructor(
    private blogService: BlogService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.fetchBlogs();


  }

  fetchBlogs() {
    this.blogService.getBlogs().subscribe((res) => {
      const rawData = res.data;
      
      
      this.blogList = Array.isArray(rawData[0]) ? rawData[0] : rawData;
console.log("", this.blogList);
      // Collect unique tags
      const tagSet = new Set<string>();
      this.blogList.forEach((blog) => {
        blog.tags?.forEach((tag: string) => tagSet.add(tag));
      });


      this.tagList = Array.from(tagSet);

      // Set default filtered list (all blogs)
      this.filteredBlogList = [...this.blogList];

      

      // Pagination
      this.totalPages = Math.ceil(this.blogList.length / this.itemsPerPage);
      this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
      this.blogService.setRecentBlogData(this.blogList);
      this.updatePaginatedList();
    });


  }

  filterByTag(tag: string) {
    this.selectedTag = tag;
    this.filteredBlogList = this.blogList.filter((blog) =>
      blog.tags?.includes(tag)
    );
    console.log(this.filteredBlogList);

    this.paginatedList = this.filteredBlogList;
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.blogList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedList();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedList();
    }
  }

  viewBlog(blog: any) {
    const rawTitle = blog.slug;
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
  scrollToTop() {
  const section = document.getElementById('blog-list-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
handleNextPage() {
  this.goToNextPage();
  this.scrollToTop();
}
}
