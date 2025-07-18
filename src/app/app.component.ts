import { Component, OnInit } from '@angular/core';

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
}
