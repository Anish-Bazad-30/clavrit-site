import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
 
  clientList : any[]=[];

  constructor(
    private clientService : ClientService,

  ){}
 
  ngOnInit(): void {
    this.fetchClient();
    console.log(this.clientList);
    
  }

  fetchClient(){
    this.clientService.getClient().subscribe((res)=>{
      this.clientList = res.data;
    })
  }
}
