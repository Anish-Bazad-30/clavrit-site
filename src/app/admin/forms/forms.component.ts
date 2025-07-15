import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  pageTitle!: string;


  type: string | null = null;
  form!: FormGroup;
  uploadedResume: File | null = null;
  uploadedImage: File | null = null;
  dragedFile: any;
  selectedFiles: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private clientService: ClientService,
    private projectService: ProjectsService,

  ) { }

  ngOnInit() {



    this.type = this.route.snapshot.paramMap.get('type') ?? '';
    console.log('Content type:', this.type);
    this.loadContent(this.type);
    this.buildFormByType(this.type);
  }


  onResumeSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.uploadedResume = file;
      this.form.patchValue({ uploadResume: file });
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.uploadedImage = file;
      this.form.patchValue({ image: file });
    }
  }


  loadContent(type: string | null) {
    // Example logic
    switch (type) {
      case 'client':
        this.pageTitle = "Client Info Form";
        break;
      case 'blog':
        this.pageTitle = "Blog Form";
        break;
      case 'project':
        this.pageTitle = "Project Form";
        break;
      case 'service':
        this.pageTitle = "Service Form";
        break;
      case 'job-detail':
        this.pageTitle = "Job Details Form";
        break;
      case 'job-application':
        this.pageTitle = "Job Application Form";
        break;
      case 'contact':
        this.pageTitle = "Contact Form";
        break;
      default:

        break;
    }
  }

  selectedFields: any = {};
  buildFormByType(type: string): void {


    switch (type) {
      case 'client':
        this.selectedFields = this.fb.group({
          name: [''],
          email: [''],
          company: [''],
          phone: [''],
          logo: [null]
        });
        break;

      case 'blog':
        this.selectedFields = this.fb.group({
          title: [''],
          subtitle: [''],
          authorName: [''],
          advantages: [''],
          disadvantages: [''],
          tags: this.fb.array([this.fb.control('')]),
          imageUrl: [''],
          conclusion: [''],
          summary: [''],
          content: ['']
        });
        break;

      case 'project':
        this.selectedFields = this.fb.group({
          title: [''],
          summary: [''],
          technologies: [''],
           keyPoints: [''],
        });
        break;

      case 'service':
        this.selectedFields = {
          name: [''],
          description: [''],
          category: ['']
        };
        break;

      case 'job-detail':
        this.selectedFields = {
          jobCategory: [''],
          jobDesignation: [''],
          jobType: [''],
          moreDetails: this.fb.group({
            id: [''],
            jobResponsibility: [''],
            jobQualification: [''],
            jobCategory: [''],
            jobType: [''],
            jobLocation: [''],
            industry: ['']
          })
        };
        break;

      case 'job-application':
        this.selectedFields = {
          name: [''],
          email: [''],
          phone: [''],
          coverletter: [''],
          uploadResume: [null]
        };
        break;

      case 'contact':
        this.selectedFields = {
          name: [''],
          email: [''],
          phone: [''],
          subject: [''],
          company: [''],
          destination: [''],
          country: [''],
          message: ['']
        };
        break;

      default:
        this.selectedFields = {
          name: [''],
          email: [''],
          phone: ['']
        };
        break;
    }

    this.form = this.fb.group(this.selectedFields);
  }


  get tags(): FormArray {
    return this.selectedFields.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  getTagControl(index: number): FormControl {
    return this.tags.at(index) as FormControl;
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles = file;
    }
  }

   onServiceSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {

      const formData = new FormData();

      // Convert JSON part
      const servicePayload = {
        name: this.selectedFields.value.name,
        type: this.selectedFields.value.email,
        company: this.selectedFields.value.company,
        phone: this.selectedFields.value.phone
      };

      formData.append('', JSON.stringify(servicePayload));

      if (this.selectedFiles) {
        formData.append('logo', this.selectedFiles);
      }

      this.clientService.createClient(formData).subscribe((res) => {

      })

    } else {
      console.log('Form is invalid:', this.form);
    }
  }

   onProjectSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {

      const formData = new FormData();

      const techArray = this.selectedFields.value.technologies
      ? this.selectedFields.value.technologies.split(',').map((tech: string) => tech.trim())
      : [];

      const keyPointsArray = this.selectedFields.value.keyPoints
      ? this.selectedFields.value.keyPoints.split(',').map((kp: string) => kp.trim())
      : [];

      // Convert JSON part
      const projectPayload = {
        title: this.selectedFields.value.title,
        summary: this.selectedFields.value.summary,
        technologies: techArray,
        keyPoints: keyPointsArray
      };

      formData.append('project', JSON.stringify(projectPayload));

      if (this.selectedFiles) {
        formData.append('images', this.selectedFiles);
      }

      this.projectService.createProjects(formData).subscribe((res) => {
      console.log(res);
      })

    } else {
      console.log('Form is invalid:', this.form);
    }
  }


  onBlogSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {
      const formData = new FormData();
// "title": "Spring Boot Blogging",
//   "subtitle": "Handling blog creation",
//   "authorName": "AMAN SHARMA",
//   "summary": "This blog covers the basics of blogs in Spring Boot.",
//   "content": "Full blog content goes here...",
//   "advantages": "Easy setup, fast dev",
//   "disadvantages": "Verbose annotations",
//   "conclusion": "Spring Boot is great!",
//   "tags": ["Spring", "Java", "Blog"]
      // Convert JSON part
      const blogPayload = {
        title: this.selectedFields.value.title,
        subtitle: this.selectedFields.value.subtitle,
        authorName: this.selectedFields.value.authorName,
        summary: this.selectedFields.value.summary,
        content: this.selectedFields.value.content,
        advantages: this.selectedFields.value.advantages,
        conclusion: this.selectedFields.value.conclusion,
        tags: this.selectedFields.value.tags,
      };

      formData.append('blog', JSON.stringify(blogPayload));

      // Append the file
      if (this.selectedFiles) {
        formData.append('images', this.selectedFiles);
      }

      this.blogService.createBlogs(formData).subscribe((res) => {

      })
    } else {
      console.log('Form is invalid:', this.form);
    }
  }

  onClientSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {

      const formData = new FormData();

      // Convert JSON part
      const clientPayload = {
        name: this.selectedFields.value.name,
        email: this.selectedFields.value.email,
        company: this.selectedFields.value.company,
        phone: this.selectedFields.value.phone
      };

      formData.append('client', JSON.stringify(clientPayload));

      if (this.selectedFiles) {
        formData.append('logo', this.selectedFiles);
      }

      this.clientService.createClient(formData).subscribe((res) => {

      })

    } else {
      console.log('Form is invalid:', this.form);
    }
  }

  onSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid:', this.form);
    }
  }
}
