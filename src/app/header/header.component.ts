import { Component } from '@angular/core';

declare var bootstrap: any;  // ✅ Add this line — not window.bootstrap

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  closeNavbar() {
    const element = document.getElementById('navbar-toggler-success');
    if (element && element.classList.contains('show')) {
      const collapse = new bootstrap.Collapse(element, {
        toggle: false
      });
      collapse.hide();
    }
  }
}
