import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {


  jobsList:any[]=[];
  careerForm!: FormGroup;
  dragedFile: any;
  selectedCVFile: any;

  constructor(
    private fb: FormBuilder,
    private jobsService : JobsService,

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
      console.log('Form Data:', this.careerForm.value);
    } else {
      this.careerForm.markAllAsTouched();
    }
  }

  fetchJobs(){
    this.jobsService.getJobs().subscribe((res)=>{
      this.jobsList = res.data;
    })
  }
 handleBrowseFile(event:any){
    this.dragedFile = event.target.files[0];
    // this.infomsg = this.dragedFile.name;
    console.log(this.dragedFile);
  }
}
