import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {

  jobsList: any;
  careerForm!: FormGroup;
  dragedFile: any;
  selectedCVFile: any;
  date!: string;

  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  
  ) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
    this.jobsList = data['job'].data;
    console.log(this.jobsList);
    
  });
    // this.fetchJobs();
    console.log(this.jobsList);


    this.careerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10-digit phone
      jobApplied: [this.jobsList.jobDesignation],
      qualification: ['', Validators.required],
      totalYOE: ['', Validators.required],
      relevantExp: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      currentCompany: ['', Validators.required],
      currentCTC: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]],
      noticePeriod: ['', Validators.required],
      coverletter: ['', Validators.required],
      // coverletter_file: [null],
      agree: [false, Validators.requiredTrue]
    });


  }
  onCVChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedCVFile = file;
      this.careerForm.patchValue({ cv: file });
      this.careerForm.get('cv')?.updateValueAndValidity();
    }
  }

  onCoverLetterFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.careerForm.patchValue({ coverletter_file: file });
      this.careerForm.get('coverletter_file')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.careerForm.valid) {
      console.log(this.careerForm.value);
      
      const formData = new FormData();

      formData.append('fullName', this.careerForm.get('fullName')?.value);
      formData.append('email', this.careerForm.get('email')?.value);
      formData.append('phone', this.careerForm.get('phone')?.value);
      formData.append('jobAppliedFor', this.careerForm.get('jobApplied')?.value);
      formData.append('qualification', this.careerForm.get('qualification')?.value);
      formData.append('totalYOE', this.careerForm.get('totalYOE')?.value);
      formData.append('relevantExperience', this.careerForm.get('relevantExp')?.value);
      formData.append('currentCompany', this.careerForm.get('currentCompany')?.value);
      formData.append('currentCTC', this.careerForm.get('currentCTC')?.value);
      formData.append('noticePeriod', this.careerForm.get('noticePeriod')?.value);
      formData.append('coverLetter', this.careerForm.get('coverletter')?.value);

      // Append files if available
      if (this.careerForm.get('coverletter_file')?.value) {
        formData.append('coverletter_file', this.careerForm.get('coverletter_file')?.value);
      }

      if (this.selectedCVFile) {
        formData.append('cv', this.selectedCVFile); // 'cv' is the key expected by BE
      }

      this.jobsService.applyJob(formData).subscribe({
        next: (res) => {
          console.log('Success', res)
          this.toastService.showToast('Form submitted successfully', 'success', 3000);
          this.careerForm.reset();
          this.resetFileInput();
        },
        error: (err) => console.error('Error', err)
      });

    } else {
      this.careerForm.markAllAsTouched();
    }
  }

  fetchJobs() {
    this.jobsService.sharedData$.subscribe(data => {
      if (data) {
        this.jobsList = data;
        console.log(this.jobsList);
        
      } else {
        // fallback: optionally load via route param or redirect
      }
    });
    this.date = this.formatDateArray(this.jobsList.createdAt);
  }

   formatDateArray(dateArray: number[]): string {
  if (!dateArray || dateArray.length < 3) return '';
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); // Month is 0-based
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
  handleBrowseFile(event: any) {
    this.dragedFile = event.target.files[0];
    // this.infomsg = this.dragedFile.name;
    console.log(this.dragedFile);
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    // Allow digits (0–9) only
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  resetFileInput() {
    this.dragedFile = null;
    this.fileInput.nativeElement.value = '';
  }
  // viewBlog(blog: any) {
  //   const rawTitle = blog.title;
    
    
  //   const slug = this.slugify(rawTitle);
  //   console.log(rawTitle, slug , blog);
  //   this.blogService.setData(blog);
  //   this.router.navigate(['/blog', slug]);
  // }
 viewJob(job: any) {
    const rawTitle = job.jobDesignation;
    const slug = this.slugify(rawTitle);
    this.jobsService.setData(job);
    
    this.router.navigate(['/career', slug]);
  }
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start
      .replace(/-+$/, '');         // Trim - from end
  }
}
