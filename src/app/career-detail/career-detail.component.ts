import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit{


  careerForm!: FormGroup;
  selectedCVFile: File | null = null;
  dragedFile: any;
  constructor(
    private jobsService : JobsService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.careerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      coverletter: [''],
      // cv: [null, Validators.required],
      coverletter_file: [null],
      agree: [false, Validators.requiredTrue]
    });
    this.jobsService.getJobs().subscribe((res) => {
      console.log(res);
    })
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
     const formData = new FormData();

  formData.append('fullName', this.careerForm.get('fullname')?.value);
  formData.append('email', this.careerForm.get('email')?.value);
  formData.append('phone', this.careerForm.get('phone')?.value);
  formData.append('coverLetter', this.careerForm.get('coverletter')?.value);

  const resumeFile = this.dragedFile
  if (resumeFile) {
    formData.append('uploadResume', resumeFile);
  }


  this.jobsService.applyJob(formData).subscribe((res)=>{

  })
  }
  handleBrowseFile(event:any){
    this.dragedFile = event.target.files[0];
    // this.infomsg = this.dragedFile.name;
    console.log(this.dragedFile);
  }
  
}
