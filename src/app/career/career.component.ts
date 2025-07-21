import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  careers = [
    {
      id: 1,
      jobDesignation: "Senior Java Developer",
      jobResponsibility: [
        "Write clean and scalable code",
        "Design and implement Java applications",
        "Lead the backend team"
      ],
      jobQualification: [
        "B.Tech in Computer Science or equivalent",
        "5+ years of experience in Java"
      ],
      competencies: [
        "Microservices",
        "REST APIs",
        "Spring Boot",
        "Problem Solving"
      ],
      jobCategory: "Software Development",
      jobType: "Part-Time",
      jobLocation: "Noida, India",
      industry: "IT Services",
      createdAt: [2025, 7, 16, 8, 53, 59],
      updatedAt: [2025, 7, 17, 8, 31, 15]
    },
    {
      id: 1,
      jobDesignation: "Senior C# Developer",
      jobResponsibility: [
        "Write clean and scalable code",
        "Design and implement Java applications",
        "Lead the backend team"
      ],
      jobQualification: [
        "B.Tech in Computer Science or equivalent",
        "5+ years of experience in Java"
      ],
      competencies: [
        "Microservices",
        "REST APIs",
        "Spring Boot",
        "Problem Solving"
      ],
      jobCategory: "Software Development",
      jobType: "Part-Time",
      jobLocation: "Noida, India",
      industry: "IT Services",
      createdAt: [2025, 7, 16, 8, 53, 59],
      updatedAt: [2025, 7, 17, 8, 31, 15]
    },
    {
      id: 1,
      jobDesignation: "Senior Angular Developer",
      jobResponsibility: [
        "Write clean and scalable code",
        "Design and implement Java applications",
        "Lead the backend team"
      ],
      jobQualification: [
        "B.Tech in Computer Science or equivalent",
        "5+ years of experience in Java"
      ],
      competencies: [
        "Microservices",
        "REST APIs",
        "Spring Boot",
        "Problem Solving"
      ],
      jobCategory: "Software Development",
      jobType: "Part-Time",
      jobLocation: "Noida, India",
      industry: "IT Services",
      createdAt: [2025, 7, 16, 8, 53, 59],
      updatedAt: [2025, 7, 17, 8, 31, 15]
    },
    {
      id: 1,
      jobDesignation: "Senior Python Developer",
      jobResponsibility: [
        "Write clean and scalable code",
        "Design and implement Java applications",
        "Lead the backend team"
      ],
      jobQualification: [
        "B.Tech in Computer Science or equivalent",
        "5+ years of experience in Java"
      ],
      competencies: [
        "Microservices",
        "REST APIs",
        "Spring Boot",
        "Problem Solving"
      ],
      jobCategory: "Software Development",
      jobType: "Part-Time",
      jobLocation: "Noida, India",
      industry: "IT Services",
      createdAt: [2025, 7, 16, 8, 53, 59],
      updatedAt: [2025, 7, 17, 8, 31, 15]
    },
  ];

  jobsList: any[] = [];
  careerForm!: FormGroup;
  dragedFile: any;
  selectedCVFile: any;

  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService,
    private toastService: ToastService,
    private router: Router,

  ) { }


  ngOnInit(): void {

    this.fetchJobs();
    console.log(this.jobsList);


    this.careerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10-digit phone
      jobApplied: ['', Validators.required],
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
          this.toastService.showToast('Subscribed successfully', 'success', 3000);
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
    this.jobsService.getJobs().subscribe((res) => {
      this.jobsList = res.data;
    })
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  handleBrowseFile(event: any) {
    this.dragedFile = event.target.files[0];
    // this.infomsg = this.dragedFile.name;
    console.log(this.dragedFile);
  }

  resetFileInput() {
    this.dragedFile = null;
    this.fileInput.nativeElement.value = '';
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    // Allow digits (0–9) only
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

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
