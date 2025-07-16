import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';
import { JobsService } from 'src/app/services/jobs.service';
import { OurServicesService } from 'src/app/services/our-services.service';
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
    private jobService: JobsService,
    private ourServicesService: OurServicesService,

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
          technologies: this.fb.array([new FormControl('')]),
          keyPoints: this.fb.array([new FormControl('')]),
        });
        break;

      case 'service':
        this.selectedFields = this.fb.group({
          name: [''],
          description: [''],
          type: [''],
          // images: ['']
        });
        break;

      case 'job-detail':
        this.selectedFields = this.fb.group({
          jobDesignation: [''],
          jobCategory: [''],
          jobType: [''],
          jobLocation: [''],
          industry: [''],
          jobResponsibility: this.fb.array([this.fb.control('')]),
          jobQualification: this.fb.array([this.fb.control('')]),
          competencies: this.fb.array([this.fb.control('')])
        });
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

  // Getter for technologies FormArray
  get technologies(): FormArray {
    return this.selectedFields.get('technologies') as FormArray;
  }

  // Add a new technology input
  addTechnology(): void {
    this.technologies.push(this.fb.control(''));
  }

  // Remove a technology input
  removeTechnology(index: number): void {
    if (this.technologies.length > 1) {
      this.technologies.removeAt(index);
    }
  }

  // Access a specific technology input
  getTechnologyControl(index: number): FormControl {
    return this.technologies.at(index) as FormControl;
  }

  // Getter for technologies FormArray
  get keyPoints(): FormArray {
    return this.selectedFields.get('keyPoints') as FormArray;
  }

  // Add a new technology input
  addKeyPoints(): void {
    this.keyPoints.push(this.fb.control(''));
  }

  // Remove a technology input
  removeKeyPoints(index: number): void {
    if (this.keyPoints.length > 1) {
      this.keyPoints.removeAt(index);
    }
  }

  // Access a specific technology input
  getKeyPointsControl(index: number): FormControl {
    return this.keyPoints.at(index) as FormControl;
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
      console.log(this.selectedFiles);
      
    }
  }








  onClientSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {

      const formData = new FormData();

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


  onBlogSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {
      const formData = new FormData();

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

  onProjectSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {

      const formData = new FormData();


      // Convert JSON part
      const projectPayload = {
        title: this.selectedFields.value.title,
        summary: this.selectedFields.value.summary,
        technologies: this.selectedFields.value.technologies,
        keyPoints: this.selectedFields.value.keyPoints
      };

      formData.append('project', JSON.stringify(projectPayload));
      console.log(this.selectedFiles);

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

  onServiceSubmit(): void {
    console.log(this.selectedFields);
    console.log(this.selectedFiles);
    if (this.selectedFields.valid) {

      const formData = new FormData();

      // Convert JSON part
      formData.append('name', this.selectedFields.value.name);
      formData.append('type', this.selectedFields.value.type);
      formData.append('description', this.selectedFields.value.description);


      // Append files
      if (this.selectedFiles) {
        // this.selectedFiles.forEach((file, index) => {
        console.log("saddsadsasaddsadsa");

        formData.append('images', this.selectedFiles); // 'images' should match BE field name
        // });
      }

      this.ourServicesService.createService(formData).subscribe((res) => {

      })

    } else {
      console.log('Form is invalid:', this.form);
    }
  }

  onjobDetailsSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {

      const formValue = this.selectedFields.value;

      const payload = {
        jobDesignation: formValue.jobDesignation,
        jobResponsibility: formValue.jobResponsibility,
        jobQualification: formValue.jobQualification,
        competencies: formValue.competencies,
        jobCategory: formValue.jobCategory,
        jobType: formValue.jobType,
        jobLocation: formValue.jobLocation,
        industry: formValue.industry
      };
      this.jobService.createJobs(payload).subscribe((res) => {

      })

    } else {
      console.log('Form is invalid:', this.form);
    }
  }

  get jobResponsibility(): FormArray {
    return this.selectedFields.get('jobResponsibility') as FormArray;
  }

  get jobQualification(): FormArray {
    return this.selectedFields.get('jobQualification') as FormArray;
  }

  get competencies(): FormArray {
    return this.selectedFields.get('competencies') as FormArray;
  }

  addResponsibility() {
    this.jobResponsibility.push(this.fb.control(''));
  }

  removeResponsibility(index: number) {
    this.jobResponsibility.removeAt(index);
  }

  addQualification() {
    this.jobQualification.push(this.fb.control(''));
  }

  removeQualification(index: number) {
    this.jobQualification.removeAt(index);
  }

  addCompetency() {
    this.competencies.push(this.fb.control(''));
  }

  removeCompetency(index: number) {
    this.competencies.removeAt(index);
  }



  // onServiceSubmit(): void {
  //   console.log(this.selectedFields);

  //   if (this.selectedFields.valid) {

  //     const formValue = this.selectedFields.value;

  //     const payload = {
  //       jobDesignation: formValue.jobDesignation,
  //       jobResponsibility: formValue.jobResponsibility,
  //       jobQualification: formValue.jobQualification,
  //       competencies: formValue.competencies,
  //       jobCategory: formValue.jobCategory,
  //       jobType: formValue.jobType,
  //       jobLocation: formValue.jobLocation,
  //       industry: formValue.industry
  //     };
  //     this.jobService.createJobs(payload).subscribe((res) => {

  //     })

  //   } else {
  //     console.log('Form is invalid:', this.form);
  //   }
  // }

  onSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid:', this.form);
    }
  }
}
