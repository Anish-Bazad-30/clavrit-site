import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';
import { CommonDeleteService } from 'src/app/services/common-delete.service';
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
    private  deleteService: CommonDeleteService

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
        // this.clientService.getClient().subscribe((res) => {
        //   this.contentList = res.data;
        // })
        break;
      case 'job-detail':
        this.pageTitle = "Job Details Management";
        this.jobService.getJobs().subscribe((res) => {
          this.contentList = res.data;
        })
        break;
      case 'job-application':
        this.pageTitle = "Job Application Management";
        this.jobService.getJobsDetails().subscribe((res) => {
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
  }



  // deleteClient(id: any) {
  //   this.clientService.deleteClient(id).subscribe((res) => {
  //     this.loadContent(this.type);
  //   })
  // }



  clientIdToDelete: any = null;

  openDeleteModal(id: any) {
  const type = this.type; // 'client', 'blog', etc.
  this.deleteService.openConfirmDelete(
    { id, type },
    () => this.confirmDelete()
  );

}

confirmDelete() {
  const { id, type } = this.deleteService.data;
   switch (type) {
      case 'client':
        return this.clientService.deleteClient(id).subscribe((res)=>{
          if(res.code === 200){
            this.clientService.getClient().subscribe((res)=>{
              this.contentList = res.data;
            })
          }
        });
      case 'blog':
        return this.blogService.deleteBlogs(id).subscribe((res)=> {
          if(res.code === 200){
            this.blogService.getBlogs().subscribe((res) =>{
              this.contentList = res.data;
            })
          }
        });
      // case 'service':
      //   return this.http.delete(`/api/services/${id}`);
      // case 'project':
      //   return this.http.delete(`/api/projects/${id}`);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
}


  deleteClient(id: any) {
    this.clientService.deleteClient(id).subscribe((res) => {
      this.loadContent(this.type);
    });
  }















  deleteBlog(id: any) {
    this.blogService.deleteBlogs(id).subscribe((res) => {
      this.loadContent(this.type);
    })
  }

  deleteProject(id: any) {
    this.projectService.deleteProjects(id).subscribe((res) => {
      this.loadContent(this.type);
    })
  }

  deleteJobDetails(id: any) {
    this.jobService.deleteJobs(id).subscribe((res) => {
      this.loadContent(this.type);
    })
  }

  deletJobApplications(id: any) {
    this.jobService.deleteJobs(id).subscribe((res) => {
      this.loadContent(this.type);
    })
  }

  deleteContact(id: any) {
    this.contactService.deleteContact(id).subscribe((res) => {
      this.loadContent(this.type);
    })
  }
}
