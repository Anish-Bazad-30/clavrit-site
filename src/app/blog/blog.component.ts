import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  blogList:any[]=[];
  tags:any[]=[];
  constructor(
    private blogService : BlogService,

  ){}
  
  ngOnInit(): void {
    this.fetchBlogs();
    console.log(this.blogList);
    
  }

  fetchBlogs(){
    this.blogService.getBlogs().subscribe((res)=>{
      this.blogList = res.data;
    })
  }

}
