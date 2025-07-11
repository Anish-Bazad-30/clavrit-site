import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
 
  clientList : any[]=[];
  subscriberEmail: string = '';
  constructor(
    private clientService : ClientService,
    private toastService: ToastService
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

  onSubscribe() {
    if (!this.subscriberEmail) return;

    const payload = this.subscriberEmail ;

    this.clientService.subscribeToCompany(payload).subscribe({
      next: (res) => {
       
          this.toastService.showToast('Subscribed successfully', 'success', 3000);
        this.subscriberEmail = '';
      },
      error: (err) => {
        
        
      },
    });
  }
}
