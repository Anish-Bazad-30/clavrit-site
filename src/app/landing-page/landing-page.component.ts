import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  
  projectList :any[]=[];
  constructor(
    private projectService : ProjectsService
  ){}
  
  ngOnInit(): void {
    this.fetchProjects();
    console.log(this.projectList);
    
  }

  fetchProjects(){
    this.projectService.getProjects().subscribe((res)=>{
      this.projectList = res.data;
    })
  }


  private isotope: any;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeIsotope();
    }, 0);
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
}
