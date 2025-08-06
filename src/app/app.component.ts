import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CanonicalService } from './services/canonical.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, FormGroup } from '@angular/forms';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clavrit';

  constructor( private router: Router, private canonical: CanonicalService,private fb: FormBuilder){
    this.form = this.fb.group({
      editorContent: ['']
    });
  }
  // ngOnInit() {
  //   // if (window.location.href.includes('#/')) {
  //   //   const cleanPath = window.location.href.split('#/')[1];
  //   //   window.location.href = `/${cleanPath || ''}`;
  //   // }
  // }


   //editordoc = jsonDoc;
 form!: FormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // form = new FormGroup({
  //   editorContent: new FormControl(
  //     { value: jsonDoc, disabled: false },
  //     Validators.required()
  //   ),
  // });

  // get doc(): AbstractControl {
  //   return this.form.get('editorContent');
  // }

 
  ngOnInit(): void {
   
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log(event);
      
      gtag('config', 'G-6C5R5RFLXP', {
        'page_path': event.urlAfterRedirects
      });
       this.canonical.setCanonicalURL(event.urlAfterRedirects)
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleScrollButton();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // goBack(): void {
  //   this.location.back();  // Navigates to the previous page in history
  // }
  toggleScrollButton() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

    if (window.pageYOffset > 100) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  }
}
