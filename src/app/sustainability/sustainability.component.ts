import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.scss']
})
export class SustainabilityComponent {
@ViewChild('Reducing-Carbon-Footprint-in-eCommerce-Logistics-with-the-Carbon-Footprint-Calculator') caseStudySection!: ElementRef;
  constructor(private route: ActivatedRoute,
  private viewportScroller: ViewportScroller){

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
