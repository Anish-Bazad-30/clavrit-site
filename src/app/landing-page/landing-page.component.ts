import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { ClientService } from '../services/client.service';
import { BusinessStatsService } from '../services/business-stats.service';
import { TechnologyService } from '../services/technology.service';
import { Router } from '@angular/router';
import { OurServicesService } from '../services/our-services.service';
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
  techList: any[] = [];
  techSlides: any[] = [];
  constructor(
    private projectService: ProjectsService,
    private clientService: ClientService,
    private bs: BusinessStatsService,
    private techService: TechnologyService,
    private readonly router: Router,
    private ourServicesService: OurServicesService,


  ) { }
  ourServices: any[] = [

    {
      title: "SAP Solutions",
      titlehome: "SAP Solutions",
      slug: "sap solutions",
      subhome: "End-to-End Implementation & Optimization",
      imageUrls: "./assets/img/sap_cx_1.webp",
      description: "End-to-End Implementation & Optimization",
    },

    {
      title: "Artificial Intelligence",
      titlehome: "AI Integration",
      slug: "Artificial Intelligence",
      subhome: "Intelligent Business Analytics",
      imageUrls: "./assets/img/AI_image.webp",
      description: "We deliver tailored AI, Deep Learning, and NLP solutions for smarter insights and automation.",
      subheading: "Ready to unlock the transformative power of Artificial Intelligence?",
      content: "At Clavrit, we offer a comprehensive suite of AI solutions designed to propel your business forward. We leverage the cutting edge of machine learning and deep learning to develop groundbreaking tools that tackle your toughest challenges. Generative AI, natural language processing, and more – these are just a few of the powerful technologies in our arsenal."
    },
    {
      title: "Salesforce",
      titlehome: "Salesforce Services",
      slug: "Salesforce",
      subhome: "CRM Transformation & Automation",
      imageUrls: "./assets/img/sf.webp",
      description: "Maximize Salesforce’s power with Clavrit’s expert consulting and support to drive growth and elevate customer experiences.",
      subheading: "Supercharge Your CRM with Next-Level Salesforce Solutions",
      content: "Customer relationships are the lifeblood of your business. But are you getting the most out of your current CRM? At Clavrit, we don’t just implement Salesforce; we unlock its full potential to transform your customer interactions. Welcome to the future of CRM. Salesforce is the engine driving growth, exceptional customer experiences, and streamlined operations for modern businesses. Our team of certified Salesforce rockstars boasts extensive experience in implementing, customizing, and optimizing solutions specifically tailored to your needs. We’re not afraid of a challenge. Our finger remains firmly on the pulse of the latest Salesforce updates and innovations, ensuring you stay ahead of the curve and leverage the platform’s full power."
    },
    {
      title: "Custom Development",
      titlehome: "Custom Development",
      slug: "Custom Development",
      subhome: "Tailored Enterprise Applications",
      imageUrls: "./assets/img/Development.webp",
      //description: "We deliver tailored AI, Deep Learning, and NLP solutions for smarter insights and automation.",
      //subheading: "Ready to unlock the transformative power of Artificial Intelligence?",
      //content: "At Clavrit, we offer a comprehensive suite of AI solutions designed to propel your business forward. We leverage the cutting edge of machine learning and deep learning to develop groundbreaking tools that tackle your toughest challenges. Generative AI, natural language processing, and more – these are just a few of the powerful technologies in our arsenal.",
      //img: "./assets/img/other-service.webp",
      description: "We build fast, reliable web and mobile apps with full support.",
      subheading: "Custom Web & Mobile Application Development",
      content: "At Clavrit, we specialize in crafting custom applications that are intuitive, scalable, and future-ready. Whether it's a mobile-first solution, enterprise web platform, or cross-platform hybrid app, our team delivers solutions that align with your business goals and user expectations. From concept to deployment, we ensure quality, performance, and security at every stage.",
    },

  ];
  ngOnInit(): void {
    this.fetchProjects();
    console.log(this.projectList);
    this.fetchClient();
    this.fetchTech();
    this.bs.getAllStats().subscribe((res) => {
      this.stats = res.data;
      this.animatedValues = new Array(this.stats.length).fill(0);

      // Delay observer setup until ViewChildren is ready
      setTimeout(() => this.setupObserver(), 0);
    });


  }

  scrollToFooter(): void {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateAll();
          this.hasAnimated = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    this.statBoxes.forEach((el) => observer.observe(el.nativeElement));
  }


  fetchProjects() {
    this.projectService.getProjects().subscribe((res) => {
      this.projectList = res.data;
    })
  }


  private isotope: any;

  ngAfterViewInit(): void {
    if(sessionStorage.getItem("URL") == "FOOTER"){
       setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 250);
        
     }
     sessionStorage.clear();
    const video: HTMLVideoElement = this.myVideo.nativeElement;
    video.muted = true;
    video.play().catch(err => {
      console.warn('Autoplay prevented:', err);
    });
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
  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight + 400,
      behavior: 'smooth'
    });
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
  stats: any[] = [];

  animatedValues: number[] = new Array(this.stats.length).fill(0);
  hasAnimated = false;

  @ViewChildren('statBox') statBoxes!: QueryList<ElementRef>;



  animateAll() {
    this.stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 1000;
      const steps = 50;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        current += increment;
        this.animatedValues[index] = Math.floor(current);
        step++;
        if (step >= steps) {
          this.animatedValues[index] = target;
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }


  techData: any[] = [];
  fetchTech() {
    this.techService.getTech().subscribe((res) => {
      this.techData = res.data;
      this.groupTechInSlides();
    })
  }

  groupTechInSlides() {
    const chunkSize = 5;
    for (let i = 0; i < this.techData.length; i += chunkSize) {
      this.techSlides.push(this.techData.slice(i, i + chunkSize));
    }
  }
  @ViewChild('myVideo', { static: true }) myVideo!: ElementRef;

  caseStudy() {
    this.router.navigate(['/sustainability'])
  }
  activeTab: string = 'enterprise';

  enterprisePlatforms: any[] =
    [{
      name: 'SAP',
      image: '../../assets/img/SAP.webp',
    },
    {
      name: 'Salesforce',
      image: '../../assets/img/salesforce.webp',
    },
    {
      name: 'Microsoft',
      image: '../../assets/img/microsoft.webp',
    },
    {
      name: 'Oracle',
      image: '../../assets/img/oracle.webp',
    },
    {
      name: 'ServiceNow',
      image: '../../assets/img/servicenow.webp',
    },
    ]
  developmentTools: any[] =
    [{
      name: 'Angular',
      image: '../../assets/img/angular.webp',
    },
    {
      name: 'Spring Boot',
      image: '../../assets/img/springboot.webp',
    },
    {
      name: 'Node.js',
      image: '../../assets/img/nodejs.webp',
    },
    {
      name: 'Docker',
      image: '../../assets/img/docker.webp',
    },
    {
      name: 'Kubernetes',
      image: '../../assets/img/kubernetes.webp',
    },
    ]
  aiTools: any[] =
    [{
      name: 'Power BI',
      image: '../../assets/img/powerbi.webp',
    },
    {
      name: 'Tableau',
      image: '../../assets/img/tableau.webp',
    },
    {
      name: 'Python ML',
      image: '../../assets/img/python.webp',
    },
    {
      name: 'ChatGPT',
      image: '../../assets/img/chatgpt.webp',
    },
    {
      name: 'Azure AI',
      image: '../../assets/img/azure.webp',
    },
    ]

  setTab(tab: string): void {
    this.activeTab = tab;
  }
  readMore(service: any) {
    const rawTitle = service.slug;
    const slug = this.slugify(rawTitle);

    // this.ourServicesService.setService(service);

    this.router.navigate(['/services', slug]);
  }
  // slugify(text: string): string {
  //   return text
  //     .toLowerCase()
  //     .replace(/\s+/g, '-')        // Replace spaces with -
  //     .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
  //     .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  //     .replace(/^-+/, '')          // Trim - from start
  //     .replace(/-+$/, '');         // Trim - from end
  // }
    slugify(text: string): string {
  return text.replace(/\s+/g, '-');
}
}
