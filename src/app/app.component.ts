import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clavrit';
  ngOnInit() {
    // if (window.location.href.includes('#/')) {
    //   const cleanPath = window.location.href.split('#/')[1];
    //   window.location.href = `/${cleanPath || ''}`;
    // }
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
