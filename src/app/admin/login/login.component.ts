import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    

    const { email, password } = this.loginForm.value;

     const body = {
      email: email,
      password: password
    };
    this.loginService.onLogin( body).subscribe({
      next: (res: any) => {
       if(res.code === 200)
       {
        sessionStorage.setItem("isLoggedIn","YES");
        sessionStorage.setItem("role", res.data.role);
        this.router.navigate(['/admin/dashboard']);
       }
       
      },
      error: (err:any) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
