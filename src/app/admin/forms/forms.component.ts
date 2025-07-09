import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  pageTitle!: string;
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  type: string | null = null;
  form!: FormGroup;
  uploadedResume: File | null = null;
  uploadedImage: File | null = null;
  dragedFile: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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
  buildFormByType(type: string): void {
    const commonFields = {
      fullName: [''],
      email: [''],
      phone: ['']
    };

    const clientFields = {
      company: [''],
      destination: [''],
      country: [''],
      subject: [''],
      message: ['']
    };

    const blogFields = {
      title: [''],
      subtitle: [''],
      authorName: [''],
      advantages: [''],
      disadvantages: [''],
      tags: [''],
      imageUrl: [''],
      conclusion: [''],
      summary: [''],
      content: ['']
    };

    const projectFields = {
      name: [''],
      description: [''],
      technology: ['']
    };

    const serviceFields = {
      name: [''],
      description: [''],
      category: ['']
    };

    const jobDetailFields = {
      jobResponsibility: [''],
      jobQualification: [''],
      jobCategory: [''],
      jobType: [''],
      jobLocation: [''],
      industry: [''],
      jobDesignation: ['']
    };

    const jobApplicationFields = {
      coverletter: [''],
      uploadResume: [null]
    };

    const contactFields = {
      name: [''],
      subject: [''],
      company: [''],
      destination: [''],
      country: [''],
      message: ['']
    };

    let selectedFields: any = {};

    switch (type) {
      case 'client':
        selectedFields = { ...commonFields, ...clientFields };
        break;
      case 'blog':
        selectedFields = { ...commonFields, ...blogFields };
        break;
      case 'project':
        selectedFields = { ...commonFields, ...projectFields };
        break;
      case 'service':
        selectedFields = { ...commonFields, ...serviceFields };
        break;
      case 'job-detail':
        selectedFields = { ...commonFields, ...jobDetailFields };
        break;
      case 'job-application':
        selectedFields = { ...commonFields, ...jobApplicationFields };
        break;
      case 'contact':
        selectedFields = { ...commonFields, ...contactFields };
        break;
      default:
        selectedFields = commonFields;
        break;
    }

    this.form = this.fb.group(selectedFields);
  }

}
