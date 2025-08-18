import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  ngOnInit(): void {
  this.blogService.previewBlogSharedData$.subscribe(data => {
  console.log('Got preview data:', data);
  this.formData = data;
});
  }
  constructor(
    private blogService: BlogService
  ){
    
  }
  formData: any = {};              // 👈 ensure it's never undefined
  @Input() previewUrls: string[] = [];      // 👈 ensure it's at least an empty array
}
