import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent implements OnInit {
@ViewChild('caseStudySection') caseStudySection!: ElementRef;
@ViewChild('Integrated-AI-experts-into-a-leading-IT-firm') caseStudySection2!: ElementRef;

  constructor(private route: ActivatedRoute,
  private viewportScroller: ViewportScroller,
  private router:Router
){

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
          }else{
             this.router.navigate(['/404']);
          }
        }, 0);
      }
    });
  }
ngAfterViewInit(): void {

    this.route.paramMap.subscribe(params => {
      const section = params.get('section');
      if (section) {
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }else{
             this.router.navigate(['/404']);
          }
        }, 100); // delay to wait for view render
      }
    });
}
}
