import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

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
}
