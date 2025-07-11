import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  joinAsPatnercontactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      destination: ['',Validators.required],
      company: ['',Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)  // Exactly 10 digits
      ]],
      country: ['',Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.joinAsPatnercontactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
  companyName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    console.log('Form submitted');

    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
      this.contactService.createContact(this.contactForm.value).subscribe((res) => {
        this.toastService.showToast('Form submitted successfully', 'success', 5000);
        this.contactForm.reset();
      })
    } else {
      this.contactForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  joinAsPatnerSubmit(): void {
    if (this.joinAsPatnercontactForm.valid) {
      const formData = {
        ...this.joinAsPatnercontactForm.value

      };
      console.log(formData);

      this.contactService.postPatner(formData).subscribe({
        next: (res) => {
          this.toastService.showToast('Form submitted successfully', 'success', 3000);
          // alert('Form submitted successfully');
          this.joinAsPatnercontactForm.reset();
        },
        error: (err) => {
          console.error('Submission failed', err);
          alert('Something went wrong');
        }
      });
    } else {
      this.joinAsPatnercontactForm.markAllAsTouched();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
  const charCode = event.key.charCodeAt(0);
  // Allow digits (0–9) only
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
}
