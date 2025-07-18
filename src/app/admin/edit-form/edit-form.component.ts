import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';
import { CommonService } from 'src/app/services/common.service';
import { JobsService } from 'src/app/services/jobs.service';
import { OurServicesService } from 'src/app/services/our-services.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  pageTitle!: string;
  data: any;

  type: string | null = null;
  // form!: FormGroup;
  uploadedResume: File | null = null;
  uploadedImage: File | null = null;
  dragedFile: any;
  selectedFiles: any[] = [];
  formSubmitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private clientService: ClientService,
    private projectService: ProjectsService,
    private jobService: JobsService,
    private ourServicesService: OurServicesService,
    private commonService: CommonService,
    private location: Location
  ) { }

  ngOnInit() {

    this.commonService.editData$.subscribe(data => {
      if (data) {
        this.data = data;
        console.log(this.data);


      }
    });

    this.type = this.route.snapshot.paramMap.get('type') ?? '';
    console.log('Content type:', this.type);
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
  get form() {
    return this.selectedFields.controls;
  }
  selectedFields: any = {};
  buildFormByType(type: string): void {


    switch (type) {
      case 'client':
        this.selectedFields = this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
          company: ['', Validators.required],
          logo: [null, Validators.required]
        });

        if (this.data) {
          this.selectedFields.patchValue({
            name: this.data.name,
            email: this.data.email,
            phone: this.data.phone,
            company: this.data.company,
            logo: this.data.logoImage
          });
          this.selectedFiles = this.data.logoImage
        }
        break;

      case 'blog':
        this.selectedFields = this.fb.group({
          title: ['', Validators.required],
          subtitle: ['', Validators.required],
          authorName: ['', Validators.required],
          advantages: ['', Validators.required],
          disadvantages: ['', Validators.required],
          tags: this.fb.array([this.fb.control('', Validators.required)]),
          // image: [null, Validators.required],
          conclusion: ['', Validators.required],
          summary: ['', [Validators.required, Validators.minLength(20)]],
          content: ['', [Validators.required, Validators.minLength(20)]]
        });
        if (this.data) {
          this.selectedFields.patchValue({
            title: this.data.title,
            subtitle: this.data.subtitle,
            authorName: this.data.authorName,
            advantages: this.data.advantages,
            disadvantages: this.data.disadvantages,
            imageUrl: this.data.imageUrl,
            conclusion: this.data.conclusion,
            summary: this.data.summary,
            content: this.data.content,

          });
          if (this.data.tags && Array.isArray(this.data.tags)) {
            this.tags.clear();
            this.data.tags.forEach((tag: string) => {
              this.tags.push(this.fb.control(tag, Validators.required));
            });
          }
          if (this.data.imageUrl && Array.isArray(this.data.imageUrl)) {
            this.previewUrls = [...this.data.imageUrl]; // populate preview URLs

            // this.data.imageUrl.forEach((url: string) => {
            // Simulate a File object from URL

            this.selectedFiles = [...this.data.imageUrl];

            // });
          }
        }
        break;

      case 'project':
        this.selectedFields = this.fb.group({
          title: ['', Validators.required],
          summary: ['', Validators.required],
          technologies: this.fb.array([new FormControl('', Validators.required)]),
          keyPoints: this.fb.array([new FormControl('', Validators.required)]),
          // image: [null, Validators.required] // only if you want to validate file
        });
        if (this.data) {
          this.selectedFields.patchValue({
            title: this.data.title,
            image: this.data.imageUrl,
            summary: this.data.summary,
          });
          if (this.data.technologies && Array.isArray(this.data.technologies)) {
            this.technologies.clear();
            this.data.technologies.forEach((technologies: string) => {
              this.technologies.push(this.fb.control(technologies, Validators.required));
            });
          }
          if (this.data.keyPoints && Array.isArray(this.data.keyPoints)) {
            this.keyPoints.clear();
            this.data.keyPoints.forEach((keyPoints: string) => {
              this.keyPoints.push(this.fb.control(keyPoints, Validators.required));
            });
          }
          if (this.data.imageUrl && Array.isArray(this.data.imageUrl)) {
            this.previewUrls = [...this.data.imageUrl]; // populate preview URLs

            // this.data.imageUrl.forEach((url: string) => {
            // Simulate a File object from URL

            this.selectedFiles = [...this.data.imageUrl];

            // });
          }
        }
        break;

      case 'service':
        this.selectedFields = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          type: ['', Validators.required],
          // images: ['']
        });
        if (this.data) {
          this.selectedFields.patchValue({
            name: this.data.name,
            description: this.data.description,
            type: this.data.type,

          });
          if (this.data.imageUrl && Array.isArray(this.data.imageUrl)) {
            this.previewUrls = [...this.data.imageUrl]; // populate preview URLs

            // this.data.imageUrl.forEach((url: string) => {
            // Simulate a File object from URL

            this.selectedFiles = [...this.data.imageUrl];

            // });
          }
        }
        break;

      case 'job-detail':
        this.selectedFields = this.fb.group({
          jobDesignation: ['', Validators.required],
          jobCategory: ['', Validators.required],
          jobType: ['', Validators.required],
          jobLocation: ['', Validators.required],
          industry: ['', Validators.required],
          jobResponsibility: this.fb.array([this.fb.control('', Validators.required)]),
          jobQualification: this.fb.array([this.fb.control('', Validators.required)]),
          competencies: this.fb.array([this.fb.control('', Validators.required)])
        });
        if (this.data) {
          this.selectedFields.patchValue({
            jobDesignation: this.data.jobDesignation,
            jobCategory: this.data.jobCategory,
            jobType: this.data.jobType,
            jobLocation: this.data.jobLocation,
            industry: this.data.industry,
          });
          if (this.data.jobResponsibility && Array.isArray(this.data.jobResponsibility)) {
            this.jobResponsibility.clear();
            this.data.jobResponsibility.forEach((jobResponsibility: string) => {
              this.jobResponsibility.push(this.fb.control(jobResponsibility, Validators.required));
            });
          }
          if (this.data.jobQualification && Array.isArray(this.data.jobQualification)) {
            this.jobQualification.clear();
            this.data.jobQualification.forEach((jobQualification: string) => {
              this.jobQualification.push(this.fb.control(jobQualification, Validators.required));
            });
          }
          if (this.data.competencies && Array.isArray(this.data.competencies)) {
            this.competencies.clear();
            this.data.competencies.forEach((competencies: string) => {
              this.competencies.push(this.fb.control(competencies, Validators.required));
            });
          }
        }
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

    // this.form = this.fb.group(this.selectedFields);
  }

  onPhoneInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.selectedFields.get('phone')?.setValue(input.value);
  }

  get tags(): FormArray {
    return this.selectedFields.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control('', Validators.required));
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
    this.technologies.push(this.fb.control('', Validators.required));
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
    this.keyPoints.push(this.fb.control('', Validators.required));
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


  // onFileSelected(event: any): void {
  //   const files = event.target.files;

  //   this.fileTouched = true;
  //   this.selectedFiles = files && files.length > 0 ? Array.from(files) : null;

  //   // Only handle validation if the form has an 'image' control
  //   const imageControl = this.selectedFields.get('image');
  //   if (imageControl) {
  //     if (this.selectedFiles && this.selectedFiles.length > 0) {
  //       imageControl.setValue(this.selectedFiles);
  //       imageControl.setErrors(null);
  //     } else {
  //       imageControl.setValue(null);
  //       imageControl.setErrors({ required: true });
  //     }
  //   }
  // }
  fileTouched: boolean = false;

  @ViewChild('fileInput1') fileInput1!: ElementRef;

  handleSingleFileInput(event: any) {
    const file = event.target.files;
    if (file && file.length > 0) {
      this.selectedFiles = file;
      this.fileTouched = true;
    }
  }

  onClientSubmit(): void {
    console.log(this.selectedFields);


    if (this.selectedFields && this.selectedFiles && this.selectedFiles.length > 0) {

      const formData = new FormData();

      const clientPayload = {
        name: this.selectedFields.value.name,
        email: this.selectedFields.value.email,
        company: this.selectedFields.value.company,
        phone: this.selectedFields.value.phone
      };

      formData.append('client', JSON.stringify(clientPayload));

      if (this.selectedFiles) {
        formData.append('logo', this.selectedFiles[0]);
      }

      this.clientService.updateClient(this.data.id, formData).subscribe((res) => {
        this.selectedFields.reset();
        this.selectedFiles = [];
        this.fileTouched = false;

        // ✅ Reset the file input
        if (this.fileInput1) {
          this.fileInput1.nativeElement.value = '';
        }
        this.location.back();
      })

    } else {
      this.fileTouched = true;
      this.selectedFields.markAllAsTouched();
    }
  }


  onBlogSubmit(): void {
    this.fileError = this.selectedFiles.length === 0;

    // Mark form fields as touched for validation feedback
    this.selectedFields.markAllAsTouched();

    // If form is invalid or no file selected, stop here
    if (this.selectedFields.invalid || this.fileError) {
      return;
    }
    const formData = new FormData();

    const blogPayload = {
      title: this.selectedFields.value.title,
      subtitle: this.selectedFields.value.subtitle,
      authorName: this.selectedFields.value.authorName,
      summary: this.selectedFields.value.summary,
      content: this.selectedFields.value.content,
      advantages: this.selectedFields.value.advantages,
      disadvantages: this.selectedFields.value.disadvantages,
      conclusion: this.selectedFields.value.conclusion,
      tags: this.selectedFields.value.tags,
    };

    formData.append('blog', JSON.stringify(blogPayload));

    if (this.selectedFiles) {
      this.selectedFiles.forEach(element => {
        formData.append('images', element);
        console.log(element);

      });

    }

    this.blogService.updateBlogs(this.data.id, formData).subscribe((res) => {
      this.selectedFields.reset();
      this.selectedFiles = [];
      this.previewUrls = [];
      this.location.back();
    })
  }


  onProjectSubmit(): void {
    this.fileError = this.selectedFiles.length === 0;

    // Mark form fields as touched for validation feedback
    this.selectedFields.markAllAsTouched();

    // If form is invalid or no file selected, stop here
    if (this.selectedFields.invalid || this.fileError) {
      return;
    }
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
      this.selectedFiles.forEach(element => {
        formData.append('images', element);
      });
    }

    this.projectService.updateProjects(this.data.id, formData).subscribe((res) => {
      this.selectedFields.reset();
      this.selectedFiles = [];
      this.previewUrls = [];
      this.location.back();
      // Optional: Clear tags or dynamic FormArrays
      // if (this.tags && this.tags.length > 0) {
      //   this.tags.clear();
      //   this.addTag(); // Optionally add one empty field back
      // }
    })

  }


  onServiceSubmit(): void {
    this.formSubmitted = true;
    if (this.selectedFields && this.selectedFiles) {

      const formData = new FormData();

      // Convert JSON part
      formData.append('name', this.selectedFields.value.name);
      formData.append('type', this.selectedFields.value.type);
      formData.append('description', this.selectedFields.value.description);
      console.log(this.selectedFiles);


      // Append files
      if (this.selectedFiles) {
        this.selectedFiles.forEach(element => {
          formData.append('images', element);
        });
      }

      this.ourServicesService.updateService(this.data.id, formData).subscribe((res) => {
        this.selectedFields.reset();
        this.selectedFiles = [];
        this.previewUrls = [];
        this.location.back();
      })

    } else {
      this.selectedFields.markAllAsTouched();
    }
  }

  onjobDetailsSubmit(): void {
    this.formSubmitted = true;
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
      this.jobService.updateJobs(this.data.id, payload).subscribe((res) => {
        this.selectedFields.reset();
        this.selectedFiles = [];
        this.previewUrls = [];
        this.location.back();
      })

    } else {
      this.selectedFields.markAllAsTouched();
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
    this.jobResponsibility.push(this.fb.control('', Validators.required));
  }

  removeResponsibility(index: number) {
    this.jobResponsibility.removeAt(index);
  }

  addQualification() {
    this.jobQualification.push(this.fb.control('', Validators.required));
  }

  removeQualification(index: number) {
    this.jobQualification.removeAt(index);
  }

  addCompetency() {
    this.competencies.push(this.fb.control('', Validators.required));
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

  // onSubmit(): void {
  //   console.log(this.selectedFields);

  //   if (this.selectedFields.valid) {
  //     console.log('Form submitted:', this.form.value);
  //   } else {
  //     console.log('Form is invalid:', this.form);
  //   }
  // }

  fileError: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  previewUrls: string[] = [];

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onImageUpload(event: any) {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      this.fileError = false;
      Array.from(files).forEach(file => {
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result); // Store preview URL
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }
}
