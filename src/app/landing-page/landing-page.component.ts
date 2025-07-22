import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { ClientService } from '../services/client.service';
declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  projectList: any[] = [];
  clientList: any[] = [];
  clientSlides: any[] = [];
  constructor(
    private projectService: ProjectsService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
    console.log(this.projectList);
    this.fetchClient();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe((res) => {
      this.projectList = res.data;
    })
  }


  private isotope: any;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeIsotope();
    }, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateAll();
          this.hasAnimated = true;
          observer.disconnect(); // stop observing after first animation
        }
      });
    }, { threshold: 0.3 });

    this.statBoxes.forEach((el) => observer.observe(el.nativeElement));
  }

  initializeIsotope() {
    const $projects = $('.projects').isotope({
      itemSelector: '.project',
      layoutMode: 'fitRows'
    });

    $('.filter-btn').off('click').on('click', (event: any) => {
      event.preventDefault();

      const filterValue = $(event.currentTarget).attr('data-filter');
      $projects.isotope({ filter: filterValue });

      $('.filter-btn').removeClass('active shadow');
      $(event.currentTarget).addClass('active shadow');
    });

    this.isotope = $projects;
  }
  ngOnDestroy(): void {
    if (this.isotope) {
      this.isotope.isotope('destroy');
    }
  }

  fetchClient() {
    this.clientService.getClient().subscribe((res) => {
      this.clientList = res.data;
      console.log(this.clientList);
      this.groupClientsInSlides();
    })

  }

   groupClientsInSlides() {
    const chunkSize = 5;
    for (let i = 0; i < this.clientList.length; i += chunkSize) {
      this.clientSlides.push(this.clientList.slice(i, i + chunkSize));
    }
  }
 stats = [
    { label: 'Years Of Experience', icon: 'bx bx-time-five', value: 7, suffix: '+' },
    { label: 'Projects', icon: 'bx bx-code-alt', value: 110, suffix: '' },
    { label: 'Team Members', icon: 'bx bx-group', value: 60, suffix: '+' },
    { label: 'Clientele', icon: 'bx bx-smile', value: 110, suffix: '' },
    { label: 'Served Countries', icon: 'bx bx-world', value: 28, suffix: '' }
  ];

  animatedValues: number[] = new Array(this.stats.length).fill(0);
  hasAnimated = false;

  @ViewChildren('statBox') statBoxes!: QueryList<ElementRef>;

  

  animateAll() {
    this.stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 1000;
      const steps = 50;
      const increment = target / steps;
      let step = 0;

      const interval = setInterval(() => {
        this.animatedValues[index] += increment;
        step++;
        if (step >= steps) {
          this.animatedValues[index] = target;
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }
}
