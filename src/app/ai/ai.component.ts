import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent {
@ViewChild('caseStudySection') caseStudySection!: ElementRef;
@ViewChild('Integrated-AI-experts-into-a-leading-IT-firm') caseStudySection2!: ElementRef;

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
