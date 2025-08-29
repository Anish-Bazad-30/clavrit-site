import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare var bootstrap: any;  // ✅ Add this line — not window.bootstrap

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private route: Router) {

  }

  closeNavbar() {

    this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects.startsWith('/')) {
          sessionStorage.clear();
        }
      });

    const element = document.getElementById('navbar-toggler-success');
    if (element && element.classList.contains('show')) {
      const collapse = new bootstrap.Collapse(element, {
        toggle: false
      });
      collapse.hide();
    }
  }
}
