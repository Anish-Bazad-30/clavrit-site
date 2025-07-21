import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  clientList: any[] = [];
  subscriberEmail: string = '';
  clientSlides: any[]=[];
  constructor(
    private clientService: ClientService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchClient();
    console.log(this.clientList);

  }

  fetchClient() {
    this.clientService.getClient().subscribe((res) => {
      this.clientList = res.data;
      console.log(this.clientList);
      this.groupClientsInSlides();
    })
    
  }

  groupClientsInSlides() {
  const chunkSize = 4;
  for (let i = 0; i < this.clientList.length; i += chunkSize) {
    this.clientSlides.push(this.clientList.slice(i, i + chunkSize));
  }
}

  onSubscribe() {
    if (!this.subscriberEmail) return;

    const payload = this.subscriberEmail;

    this.clientService.subscribeToCompany(payload).subscribe({
      next: (res) => {

        this.toastService.showToast('Subscribed successfully', 'success', 3000);
        this.subscriberEmail = '';
      },
      error: (err) => {


      },
    });
  }

  @ViewChildren('progressSection', { read: ElementRef }) progressBars!: QueryList<ElementRef>;

  expertiseList = [
    { title: 'SAP CX', value: 90, animatedValue: 0 },
    { title: 'ARTIFICIAL INTELLIGENCE', value: 60, animatedValue: 0 },
    { title: 'SAP CDC', value: 74, animatedValue: 0 },
    { title: 'SAP COMMERCE', value: 74, animatedValue: 0 },
    { title: 'SALESFORCE', value: 74, animatedValue: 0 },
    { title: 'ENTERPRISE APPLICATION', value: 74, animatedValue: 0 },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateProgressBars();
          observer.disconnect(); // Run only once
        }
      });
    });

    observer.observe(document.querySelector('.creative-progress')!);
  }

  animateProgressBars() {
    this.expertiseList.forEach((skill, index) => {
      let current = 0;
      const step = () => {
        if (current < skill.value) {
          current++;
          this.expertiseList[index].animatedValue = current;
          setTimeout(step, 10); // Speed of animation
        }
      };
      step();
    });
  }
}
