import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ClientService } from 'src/app/services/client.service';

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
  selectedFiles: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private clientService: ClientService,

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
        this.selectedFields = {
          name: [''],
          email: [''],
          company: [''],
          phone:['']
          // companyLogo: [null]
        };
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
        this.selectedFields = {
          name: [''],
          description: [''],
          technology: ['']
        };
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

  

 
  onBlogSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {
       const blogData = this.selectedFields.value;

    const formData = new FormData();

    // 👇 Convert JSON to a File (so we can specify content-type)
    const blogFile = new File(
      [JSON.stringify(blogData)],
      'blog.json',
      { type: 'application/json' }
    );

    // ✅ Append blog as application/json file
    formData.append('blog', blogFile);

    // ✅ Append all selected image files
    for (let file of this.selectedFiles) {
      formData.append('images', file);
    }
      console.log('Form submitted:', formData);
      this.blogService.createBlogs(formData).subscribe((res) => {

      })
    } else {
      console.log('Form is invalid:', this.form);
    }
  }

  onClientSubmit(): void {
    console.log(this.selectedFields);

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.clientService.createClient(this.form.value).subscribe((res)=>{

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
