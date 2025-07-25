import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.scss']
})
export class SustainabilityComponent implements OnInit {
@ViewChild('Reducing-Carbon-Footprint-in-eCommerce-Logistics-with-the-Carbon-Footprint-Calculator') caseStudySection!: ElementRef;
  constructor(private route: ActivatedRoute,
  private viewportScroller: ViewportScroller){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sectionId = params['section'];
      if (sectionId) {
        // Wait for view to render
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    });
  }
ngAfterViewInit(): void {
  // Wait for DOM to fully render
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      }, 0);
    }
  });
}
}
