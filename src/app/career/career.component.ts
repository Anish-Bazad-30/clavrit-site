import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  careerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
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
      noticePeriod: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.careerForm.valid) {
      console.log('Form Data:', this.careerForm.value);
    } else {
      this.careerForm.markAllAsTouched();
    }
  }

}
