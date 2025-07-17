import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';
import { CommonDeleteService } from 'src/app/services/common-delete.service';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';
import { JobsService } from 'src/app/services/jobs.service';
import { OurServicesService } from 'src/app/services/our-services.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent {

  pageTitle!: string;
  type: string | null = null;
  contentList: any[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private clientService: ClientService,
    private blogService: BlogService,
    private projectService: ProjectsService,
    private ourServiceServices: OurServicesService,
    private jobService: JobsService,
    private deleteService: CommonDeleteService,
    private commonService: CommonService,


  ) { }

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
        this.clientService.getClient().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'blog':
        this.pageTitle = "Blog Management";
        this.blogService.getBlogs().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'project':
        this.pageTitle = "Project Management";
        this.projectService.getProjects().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'service':
        this.pageTitle = "Service Management";
        this.ourServiceServices.getAllServices().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'job-detail':
        this.pageTitle = "Job Details Management";
        this.jobService.getJobs().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'job-application':
        this.pageTitle = "Job Application Management";
        this.jobService.getJobsApplications().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'contact':
        this.pageTitle = "Contact Management";
        this.contactService.getContact().subscribe((res) => {
          this.contentList = res.data;
        })
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

  edit(data: any) {
    this.commonService.setEditData(data);
    this.router.navigate(['/admin/edit-forms', this.type]);
  }

  showDeleteModal = false;
  deleteType: string = '';
  deleteId: number  = 0;

  openDeleteModal(type: string, id: number) {
    this.deleteType = type;
    this.deleteId = id;
    console.log("sadassad");

    this.showDeleteModal = true;
  }

  handleDelete(event: { type: string; id: number }) {
    console.log(event.id);
    
    switch (this.type) {
      case 'client':
        this.clientService.deleteClient(event.id).subscribe((res) => {
          this.loadContent(this.type);
        });
        break;
      case 'blog':
        this.blogService.deleteBlogs(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      case 'project':
        this.projectService.deleteProjects(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      case 'service':
        this.ourServiceServices.deleteService(event.id).subscribe((res) => {
          this.loadContent(this.type);
        });
        break;
      case 'job-detail':
        this.jobService.deleteJobs(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      case 'job-application':
        this.jobService.deleteJobsApplication(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      case 'contact':
        this.contactService.deleteContact(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      default:

        break;
    }

    this.showDeleteModal = false;
  }
}
