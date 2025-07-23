import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { BusinessStatsService } from 'src/app/services/business-stats.service';
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
  searchText = '';
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
    private businessStatsService: BusinessStatsService,


  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log('Content type:', this.type);

    // Use this.type to load the relevant list
    this.loadContent(this.type);
  }

  loadContent(type: string | null) {
    // Example logic
    this.searchText = '';
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
      case 'business-stats':
        this.pageTitle = "Business Stats Management";
        this.businessStatsService.getAllStats().subscribe((res)=>{
          this.contentList = res.data;
        })
        break;
      default:

        break;
    }
  }




  downloadResume(fileUrl: string, applicantName: string = 'resume') {
    const extension = fileUrl.split('.').pop()?.split('?')[0] || 'file';
    const fileName = `${applicantName}_resume.${extension}`;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  form() {
    this.router.navigate(["/admin/forms", this.type]);

  }

  get contentListview() {
    const search = this.searchText?.toLowerCase() || '';

    let filteredList = this.contentList;

    if (search && this.type) {
      filteredList = this.contentList.filter(item => {
        switch (this.type) {
          case 'client':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.phone?.toLowerCase().includes(search) ||
              item.company?.toLowerCase().includes(search)
            );
          case 'blog':
            return (
              item.title?.toLowerCase().includes(search) ||
              item.authorName?.toLowerCase().includes(search)
            );
          case 'project':
            return (
              item.title?.toLowerCase().includes(search) ||
              item.technologies?.some((tech: any) => tech.toLowerCase().includes(search.toLowerCase()))
            );
          case 'service':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.type?.toLowerCase().includes(search) ||
              item.description?.toLowerCase().includes(search)
            );
          case 'job-detail':
            return (
              item.jobCategory?.toLowerCase().includes(search) ||
              item.jobDesignation?.toLowerCase().includes(search)
            );
          case 'job-application':
            return (
              item.fullName?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.jobAppliedFor?.toLowerCase().includes(search) ||
              item.phone?.toLowerCase().includes(search)
            );
          case 'contact':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.company?.toLowerCase().includes(search)
            );
            case 'business-stats':
            return (
              item.title?.toLowerCase().includes(search) ||
              item.value?.toLowerCase().includes(search) 
            );
          default:
            return true;
        }
      });
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getTotalPages(): number {
    const search = this.searchText?.toLowerCase() || '';

    let filteredList = this.contentList;

    if (search && this.type) {
      filteredList = this.contentList.filter((item) => {
        switch (this.type) {
          case 'client':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.phone?.toLowerCase().includes(search) ||
              item.company?.toLowerCase().includes(search)
            );
          case 'blog':
            return (
              item.title?.toLowerCase().includes(search) ||
              item.authorName?.toLowerCase().includes(search)
            );
          case 'project':
            return (
              item.title?.toLowerCase().includes(search) ||
              item.technologies?.some((tech: any) => tech.toLowerCase().includes(search.toLowerCase()))
            );
          case 'service':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.type?.toLowerCase().includes(search) ||
              item.description?.toLowerCase().includes(search)
            );
          case 'job-detail':
            return (
              item.jobCategory?.toLowerCase().includes(search) ||
              item.jobDesignation?.toLowerCase().includes(search)
            );
          case 'job-application':
            return (
              item.fullName?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.jobAppliedFor?.toLowerCase().includes(search) ||
              item.phone?.toLowerCase().includes(search)
            );
          case 'contact':
            return (
              item.name?.toLowerCase().includes(search) ||
              item.email?.toLowerCase().includes(search) ||
              item.company?.toLowerCase().includes(search)
            );
          default:
            return true;
        }
      });
    }

    return Math.ceil(filteredList.length / this.itemsPerPage);
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
  deleteId: number = 0;

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
        case 'business-stats':
        this.businessStatsService.deleteStat(event.id).subscribe((res) => {
          this.loadContent(this.type);
        })
        break;
      default:

        break;
    }

    this.showDeleteModal = false;
  }
}
