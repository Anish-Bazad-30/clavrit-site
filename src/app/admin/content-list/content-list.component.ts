import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent {
  pageTitle = " ";
  type: string | null = null;

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
}
