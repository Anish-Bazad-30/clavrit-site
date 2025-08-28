import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { NgxSummernoteDirective } from 'ngx-summernote';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { BlogService } from 'src/app/services/blog.service';
import { BusinessStatsService } from 'src/app/services/business-stats.service';
import { ClientService } from 'src/app/services/client.service';
import { JobsService } from 'src/app/services/jobs.service';
import { OurServicesService } from 'src/app/services/our-services.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TechnologyService } from 'src/app/services/technology.service';
declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  pageTitle!: string;


  type: string | null = null;
  textArea!: FormGroup;
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
    private location: Location,
    private businessStatsService: BusinessStatsService,
    private techservice: TechnologyService,
    private sanitizer: DomSanitizer


  ) {
    this.textArea = this.fb.group({
      editorContent: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type') ?? '';
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
      case 'business-stats':
        this.pageTitle = "Business Stats Form";
        break;
      case 'tools':
        this.pageTitle = "Tools & Technology";
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
        break;
      case 'tools':
        this.selectedFields = this.fb.group({
          tools: [null, Validators.required]
        });
        break;
      case 'blog':
        this.selectedFields = this.fb.group({
          title: ['', Validators.required],
          subtitle: ['', Validators.required],
          authorName: ['', Validators.required],
          status: [''],
          tags: this.fb.array([this.fb.control('', Validators.required)]),
          // imageUrl: [null, Validators.required],
          serpTitle: ['', Validators.required],
          serpDescription: ['', [Validators.required, Validators.minLength(20)]],
          content: ['', [Validators.required, Validators.minLength(20)]]
        });
        break;

      case 'project':
        this.selectedFields = this.fb.group({
          title: ['', Validators.required],
          summary: ['', Validators.required],
          technologies: this.fb.array([new FormControl('', Validators.required)]),
          keyPoints: this.fb.array([new FormControl('', Validators.required)]),
          // image: [null, Validators.required] // only if you want to validate file
        });
        break;

      case 'service':
        this.selectedFields = this.fb.group({
          name: [null, Validators.required],
          subheading: [null, Validators.required],
          description: [null, Validators.required],
          metaTitle: [null, Validators.required],
          slug: [null, Validators.required],
          metaDescription: [null, Validators.required],
          content: [null, Validators.required],
          category: [null, Validators.required]
        });
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

      case 'business-stats':
        this.selectedFields = this.fb.group({
          title: [''],
          value: [''],
        });
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

      this.clientService.createClient(formData).subscribe((res) => {
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


  onToolSubmit(): void {

    if (this.selectedFields && this.selectedFiles && this.selectedFiles.length > 0) {

      const formData = new FormData();

      if (this.selectedFiles) {
        formData.append('image', this.selectedFiles[0]);
      }

      this.techservice.createTech(formData).subscribe((res) => {
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
    const content = this.selectedFields.get('content').value; // <-- get content from form control
    // Normalize Unicode for special characters and quotes
    this.selectedFields.get('content').setValue(content.normalize('NFC'));
    const blogPayload = {
      title: this.selectedFields.value.title,
      slug: this.selectedFields.value.subtitle,
      authorName: this.selectedFields.value.authorName,
      publish: this.selectedFields.value.status,
      content: this.selectedFields.value.content,
      serpTitle: this.selectedFields.value.serpTitle,
      serpMetaDescription: this.selectedFields.value.serpDescription,
      tags: this.selectedFields.value.tags,
    };

    formData.append('blog', JSON.stringify(blogPayload));
    // for()
    if (this.selectedFiles) {
      this.selectedFiles.forEach(element => {
        formData.append('bannerImage', element);


      });

    }

    this.blogService.createBlogs(formData).subscribe((res) => {
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

    if (this.selectedFiles) {
      this.selectedFiles.forEach(element => {
        formData.append('images', element);
      });
    }

    this.projectService.createProjects(formData).subscribe((res) => {
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
  onServiceSubmit(): void {
    this.fileError = this.selectedFiles.length === 0;


    this.selectedFields.markAllAsTouched();

    // If form is invalid or no file selected, stop here
    if (this.selectedFields.invalid || this.fileError) {
      return;
    }

    const formData = new FormData();

    // Convert JSON part
    formData.append('title', this.selectedFields.value.name || '');
    formData.append('subheading', this.selectedFields.value.subheading || '');
    formData.append('description', this.selectedFields.value.description || '');
    formData.append('metaTitle', this.selectedFields.value.metaTitle || '');
    formData.append('slug', this.selectedFields.value.slug || '');
    formData.append('metaDescription', this.selectedFields.value.metaDescription || '');
    formData.append('content', this.selectedFields.value.content || '');
    formData.append('category', this.selectedFields.value.category || '');




    // Append files
    if (this.selectedFiles) {


      this.selectedFiles.forEach(element => {
        formData.append('images', element);
      });// 'images' should match BE field name
      // });
    }

    this.ourServicesService.createService(formData).subscribe((res) => {
      this.selectedFields.reset();
      this.selectedFiles = [];
      this.previewUrls = [];
      this.location.back();
      // Optional: Clear tags or dynamic FormArrays

    })

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
      this.jobService.createJobs(payload).subscribe((res) => {
        this.selectedFields.reset();
        this.selectedFiles = [];
        this.previewUrls = [];
        this.location.back();
        // Optional: Clear tags or dynamic FormArrays

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

  onSubmit(): void {
    console.log(this.selectedFields);

    if (this.selectedFields.valid) {

    } else {

    }
  }

  onStatsSubmit(): void {

    if (this.selectedFields && this.selectedFiles && this.selectedFiles.length > 0) {
      let title = this.selectedFields.value.title;
      let value = this.selectedFields.value.value;
      this.businessStatsService.createStat(title, value, this.selectedFiles[0]).subscribe((res) => {
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
  onPreview() {
    this.blogService.setPreviewBlogData(this.selectedFields.value);
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    modal.show();
  }


  //summernot

  @ViewChild(NgxSummernoteDirective) ngxSummernote?: NgxSummernoteDirective;
  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.selectedFields.get('content').value);
  }

  addText() {
    const text = 'This is the text to be inserted';
    //const editor = this.ngxSummernote['_editor'];
    //editor.insertText(text);
  }
  onBlur() {

  }

  onDelete(file: any) {

  }

  summernoteInit(e: any) {
    setTimeout(() => {
      document.querySelectorAll('.note-toolbar button[title]').forEach((btn: any) => {
        if (btn.title) {
          btn.setAttribute('title', btn.title.replace(/\s+/g, ' ')); // multiple newlines → space
        }
      });

      // re-init Bootstrap tooltips
      ($('[data-original-title]') as any).tooltip({ placement: 'top' });
    }, 0);
  }



  config: any = {
    airMode: false,
    tooltip: true,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']],
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear',
          ],
        ],
      ],
    },
    height: 200,
    uploadImagePath: 'https://clavrit.com:8085/clavrit/blogs/media/upload',
    uploadImageRequestOptions: { withCredentials: false },
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
    ],
    buttons: {
      testBtn: customButton,
    },
    codeviewFilter: true,
    codeviewFilterRegex:
      /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true,
  };

  ngOnDestroy() {
    ($('#summernote') as any).summernote('destroy');
  }
  ngAfterViewInit() {
    const editor = $('#summernote'); // ya ViewChild reference
    editor.on('summernote.paste', (e: any) => this.handlePaste(e));
  }

  handlePaste(e: any) {
    // Type assertion for clipboardData
    const clipboardData = (e.originalEvent as ClipboardEvent).clipboardData;
    if (!clipboardData) return;

    const text = clipboardData.getData('text/plain');

    // Normalize quotes / special chars
    const normalized = text
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .normalize('NFC');

    e.preventDefault();

    // Insert normalized text into Summernote
    document.execCommand('insertText', false, normalized);
  }


}

function customButton(context: any) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '<i class="note-icon-magic"></i> Hello',
    tooltip: 'Custom button',
    container: '.note-editor',
    className: 'note-btn',
    click: function () {
      context.invoke('editor.insertText', 'Hello from test btn!!!');
    },
  });
  return button.render();


}
