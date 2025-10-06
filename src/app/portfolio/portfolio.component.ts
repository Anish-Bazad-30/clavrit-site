import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {


  section :any ;
  constructor(private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sectionId = params['section'];
      console.log(sectionId);
      
      if (sectionId) {
        // Wait for view to render
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }else{
             this.router.navigate(['/404']);
          }
        }, 0);
      }
    });
  }
ngAfterViewInit(): void {
  // Wait for DOM to fully render

   this.route.paramMap.subscribe(params => {
      this. section = params.get('section');
      
      if (this.section) {
        setTimeout(() => {
          const el = document.getElementById(this.section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }else{
             this.router.navigate(['/404']);
          }
        }, 500); // delay to wait for view render
      }
    });
}
}
