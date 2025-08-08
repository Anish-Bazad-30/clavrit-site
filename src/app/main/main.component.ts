import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {


  showLayout = true;
  constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navEnd = event as NavigationEnd;
      const url = navEnd.urlAfterRedirects;

      // Hide layout for admin and 404 page
      this.showLayout = !(
        url.startsWith('/admin') ||
        url === '/404' ||
        url === '/not-found'
      );
    });
}
  
}
