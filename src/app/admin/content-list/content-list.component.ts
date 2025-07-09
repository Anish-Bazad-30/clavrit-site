import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent {
  pageTitle!: string;
  type: string | null = null;
  contentList = [
  { name: "Anusha", email: "anusha@example.com", companyLogo: "logo1.png", companyName: "Company A" },
  { name: "Raj", email: "raj@example.com", companyLogo: "logo2.png", companyName: "Company B" },
  { name: "Priya", email: "priya@example.com", companyLogo: "logo3.png", companyName: "Company C" },
  { name: "Amit", email: "amit@example.com", companyLogo: "logo4.png", companyName: "Company D" },
  { name: "Sara", email: "sara@example.com", companyLogo: "logo5.png", companyName: "Company E" },
  { name: "John", email: "john@example.com", companyLogo: "logo6.png", companyName: "Company F" },
  { name: "Meena", email: "meena@example.com", companyLogo: "logo7.png", companyName: "Company G" },
  { name: "Kumar", email: "kumar@example.com", companyLogo: "logo8.png", companyName: "Company H" },
  { name: "Rita", email: "rita@example.com", companyLogo: "logo9.png", companyName: "Company I" },
  { name: "Vikram", email: "vikram@example.com", companyLogo: "logo10.png", companyName: "Company J" },
  { name: "Sneha", email: "sneha@example.com", companyLogo: "logo11.png", companyName: "Company K" },
  { name: "Ali", email: "ali@example.com", companyLogo: "logo12.png", companyName: "Company L" }
];

  currentPage = 1;
  itemsPerPage = 10;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log('Content type:', this.type);

    // Use this.type to load the relevant list
    this.loadContent(this.type);
  }

  loadContent(type: string | null) {
    // Example logic
    switch (type) {
      case 'client':
        this.pageTitle = "Client info Management";
        break;
      case 'blog':
        this.pageTitle = "Blog Management";
        break;
      case 'project':
        this.pageTitle = "Project Management";
        break;
      case 'service':
        this.pageTitle = "Service Management";
        break;
      case 'job-detail':
        this.pageTitle = "Job Details Management";
        break;
      case 'job-application':
        this.pageTitle = "Job Application Management";
        break;
      case 'contact':
        this.pageTitle = "Contact Management";
        break;
      default:

        break;
    }
  }

  form() {
    this.router.navigate(["/admin/forms", this.type]);

  }

  get contentListview() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.contentList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.contentList.length / this.itemsPerPage);
  }

  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
    }
  }
}
