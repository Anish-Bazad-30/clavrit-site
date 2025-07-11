import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
    contactForm!: FormGroup;
joinAsPatnercontactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactService : ContactService,

  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      destination: [''],
      company: [''],
      phone: [''],
      country: [''],
      subject: [''],
      message: ['']
    });

    this.joinAsPatnercontactForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Form submitted');

    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
      this.contactService.createContact(this.contactForm.value).subscribe((res)=>{
        
      })
    } else {
      this.contactForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  joinAsPatnerSubmit(): void {
    if (this.joinAsPatnercontactForm.valid) {
      console.log('Form Data:', this.joinAsPatnercontactForm.value);
      // Add API call here if needed
    } else {
      this.joinAsPatnercontactForm.markAllAsTouched();
    }
  }
}
