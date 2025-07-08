import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
   type: string | null = null;
  
    constructor(private route: ActivatedRoute, private router: Router) { }
  
    ngOnInit() {
      this.type = this.route.snapshot.paramMap.get('type');
      console.log('Content type:', this.type);
    }
}
