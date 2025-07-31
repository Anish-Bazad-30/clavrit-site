import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clavrit';

  constructor( private router: Router){
    
  }
  // ngOnInit() {
  //   // if (window.location.href.includes('#/')) {
  //   //   const cleanPath = window.location.href.split('#/')[1];
  //   //   window.location.href = `/${cleanPath || ''}`;
  //   // }
  // }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log(event);
      
      gtag('config', 'G-6C5R5RFLXP', {
        'page_path': event.urlAfterRedirects
      });
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleScrollButton();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
