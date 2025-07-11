import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {

  jobsList: any[] = [];
  careerForm!: FormGroup;
  dragedFile: any;
  selectedCVFile: any;

  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService,
private toastService: ToastService
  ) { }


  ngOnInit(): void {

    this.fetchJobs();
    console.log(this.jobsList);


    this.careerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      jobApplied: ['', Validators.required],
      qualification: ['', Validators.required],
      totalYOE: ['', Validators.required],
      relevantExp: ['', Validators.required],
      currentCompany: ['', Validators.required],
      currentCTC: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      coverletter: [''],
      coverletter_file: [null],
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
        next: (res) => {console.log('Success', res)
          this.toastService.showToast('Form submitted successfully', 'success', 3000);
          this.careerForm.reset();
          this.dragedFile = null;
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
  handleBrowseFile(event: any) {
    this.dragedFile = event.target.files[0];
    // this.infomsg = this.dragedFile.name;
    console.log(this.dragedFile);
  }
}
