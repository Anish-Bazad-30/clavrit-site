import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OurServicesService } from '../services/our-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-provided',
  templateUrl: './services-provided.component.html',
  styleUrls: ['./services-provided.component.scss']
})
export class ServicesProvidedComponent implements OnInit{

  ourServices: any[] = [
    // {
    //   title: "SAP Solutions",
    //   img: "./assets/img/sap_cx_1.webp",
    //   description: "End-to-End Implementation & Optimization",
    // },
    //  {
    //   title: "SAP Commerce Tools",
    //   img: "./assets/img/managedServices.webp",
    //   description: "Elevate Your E-Commerce Success with Clavrit’s commercetools Solutions",
    //   subheading: "Your Trusted Partner for Effortless SAP Management",
    //   content: "Ready to transform your digital commerce strategy? Clavrit’s commercetools Solution Services empower you to build a dynamic, scalable, and innovative e-commerce business tailored to your unique needs. Our team of expert developers and strategists partners closely with your organization to understand your challenges, objectives, and vision for a future-ready commerce platform. Leveraging the cutting-edge capabilities of commercetools’ headless, API-first, and cloud-native platform, we deliver customized solutions that drive growth and engagement.Whether you’re launching a new online store, expanding into global markets, or modernizing an existing platform, Clavrit ensures seamless integration with your systems—ERP, CRM, PIM, and more—through commercetools’ robust APIs and MACH (Microservices, API-first, Cloud-native, Headless) architecture. Our solutions enable you to create highly personalized, omnichannel experiences, ensuring consistency across web, mobile, social, in-store, and emerging touchpoints like IoT or voice commerce.With commercetools’ modular and versionless architecture, we help you eliminate technical debt, accelerate time-to-market, and scale effortlessly during peak traffic, such as Black Friday or flash sales. Our services include advanced catalog management, AI-driven personalization, streamlined checkout processes, and secure integrations to optimize performance and customer satisfaction. From B2B to B2C, we craft tailored storefronts and workflows that enhance conversions, boost loyalty, and meet complex business demands with agility.Partner with Clavrit’s commercetools Solution Services to unlock limitless commerce possibilities. Drive revenue growth, deliver unforgettable customer experiences, and lead the digital marketplace with a platform built for innovation and scale."
    // },
 
    // {
    //   title: "SAP CX",
    //   img: "./assets/img/sap_cx_1.webp",
    //   description: "Our SAP CX Services provide tailored strategies and seamless implementation using SAP’s advanced technologies.",
    //   subheading: "Unleashing the Power of Customer Experience with Clavrit SAP CX",
    //   content: "Forget cookie-cutter solutions. At Clavrit, we craft bespoke SAP CX strategies that cater to your unique business DNA. We become an extension of your team, partnering with you from the initial consultation all the way through implementation and beyond. Our goal? Seamless integration and maximizing the value you extract from SAP’s cutting-edge CX technologies. Our team dives deep into your current customer experience landscape, uncovering opportunities and aligning them with your objectives. Through close collaboration with your stakeholders, we develop a customized plan. Then, we leverage the power of SAP CX to design and tailor solutions that perfectly fit your specific needs. We empower you to stay ahead of the curve, delivering exceptional experiences that cultivate customer satisfaction and unwavering loyalty. Partner with Clavrit and transform your customer interactions into a competitive advantage."
    // },
    // {
    //   title: "SAP CDC",
    //   img: "./assets/img/cdc-1.webp",
    //   description: "Grow a loyal customer base and boost conversions securely with our expert SAP CDC solutions.",
    //   subheading: "Turn Casual Browsers into Lifelong Fans with SAP CDC",
    //   content: "Forget stagnant customer bases. SAP Customer Data Cloud (CDC) unlocks the power to cultivate a loyal and thriving community around your brand. In today’s dynamic landscape, streamlined customer engagement is no longer a luxury, it’s a necessity. Clavrit empowers you to build a secure and privacy-conscious digital ecosystem for both your business and your customers. Our expert team, veterans in SAP CDC, guides you through every step – from development and deployment to ongoing management and optimization. We go beyond just technology. Our strategic brand management approach helps you amplify your voice, cultivate brand loyalty, and achieve long-term business objectives. Become a leader in your industry; let Clavrit be your trusted partner in unlocking the full potential of SAP CDC."
    // },
    // {
    //   title: "SAP Commerce",
    //   img: "./assets/img/sap-commerce.webp",
    //   description: "Drive e-commerce success with seamless, scalable SAP Commerce Cloud solutions for exceptional customer experiences.",
    //   subheading: "Level Up Your E-Commerce Game with Clavrit’s SAP Commerce Cloud Solutions",
    //   content: "Ready to dominate the digital marketplace? Clavrit’s SAP Commerce Cloud Solution Services are your one-stop shop for crafting a winning e-commerce business. Our team of seasoned professionals dives deep into your organization to understand your unique challenges, goals, and e-commerce platform aspirations. We leverage the robust capabilities of SAP Commerce Cloud to design and implement a customized solution that perfectly aligns with your vision. Launching a brand new online store? Upgrading an existing platform? No problem. Our experts ensure seamless integration with your current systems and processes, guaranteeing a smooth transition. In today’s omnichannel world, consistency is key. Our services empower you to deliver a unified and personalized experience for your customers – whether they’re browsing your website, engaging on social media, or visiting your brick-and-mortar stores. We don’t stop at design; we also offer performance optimization and scalability enhancements to ensure your platform thrives during peak shopping seasons. Partner with Clavrit’s SAP Commerce Cloud Solution Services and unlock the full potential of your e-commerce business. Drive explosive revenue growth, cultivate unwavering customer loyalty, and solidify your position as a leader in the digital marketplace. "
    // },
    // {
    //   title: "SAP Managed Services",
    //   img: "./assets/img/managedServices.webp",
    //   description: "Clavrit’s SAP Managed Services keep your SAP systems optimized and secure, so you can focus on growth and innovation.",
    //   subheading: "Your Trusted Partner for Effortless SAP Management",
    //   content: "Feeling bogged down by the complexities of your SAP system? Let Clavrit take the weight off your shoulders. Our comprehensive suite of SAP Managed Services empowers you to focus on what matters most – growing your business. Our team of seasoned SAP veterans acts as an extension of your staff, providing expert management and solutions for your entire SAP ecosystem. We handle the day-to-day headaches, freeing you to pursue your core business goals."
    // },
    // {
    //   title: "Salesforce",
    //   img: "./assets/img/sf.webp",
    //   description: "Maximize Salesforce’s power with Clavrit’s expert consulting and support to drive growth and elevate customer experiences.",
    //   subheading: "Supercharge Your CRM with Next-Level Salesforce Solutions",
    //   content: "Customer relationships are the lifeblood of your business. But are you getting the most out of your current CRM? At Clavrit, we don’t just implement Salesforce; we unlock its full potential to transform your customer interactions. Welcome to the future of CRM. Salesforce is the engine driving growth, exceptional customer experiences, and streamlined operations for modern businesses. Our team of certified Salesforce rockstars boasts extensive experience in implementing, customizing, and optimizing solutions specifically tailored to your needs. We’re not afraid of a challenge. Our finger remains firmly on the pulse of the latest Salesforce updates and innovations, ensuring you stay ahead of the curve and leverage the platform’s full power."
    // },
    // {
    //   title: "Artificial Intelligence",
    //   img: "./assets/img/AI_image.webp",
    //   description: "We deliver tailored AI, Deep Learning, and NLP solutions for smarter insights and automation.",
    //   subheading: "Ready to unlock the transformative power of Artificial Intelligence?",
    //   content: "At Clavrit, we offer a comprehensive suite of AI solutions designed to propel your business forward. We leverage the cutting edge of machine learning and deep learning to develop groundbreaking tools that tackle your toughest challenges. Generative AI, natural language processing, and more – these are just a few of the powerful technologies in our arsenal."
    // },
    // {
    //   title: "Enterprise Application",
    //   img: "./assets/img/enterprise.webp",
    //   description: "We build secure, scalable enterprise solutions with Java, Python, SQL, Scala, and Kotlin.",
    //   subheading: "Building the Backbone of Your Digital Future with Enterprise Applications",
    //   content: "In today’s digital age, enterprise applications are no longer an option, they’re the lifeblood of your organization. At Clavrit, we don’t just implement these technologies; we craft them into a streamlined, secure engine that drives efficiency, productivity, and innovation. We understand the critical role of enterprise applications. They empower your teams to operate flawlessly, achieve peak performance, and fuel a culture of constant improvement. But security is paramount. Our team of seasoned professionals prioritizes robust measures and unwavering compliance standards to safeguard your sensitive data and ensure resilience against cyber threats and ever-evolving regulations. Staying ahead of the curve is crucial. As the digital landscape continues to shift, embracing cutting-edge enterprise technologies is vital for maintaining a competitive edge. Our experts understand the power of agility and staying adaptable to meet the ever-changing needs of your customers."
    // },
    // {
    //   title: "Other Services",
    //   img: "./assets/img/other-service.webp",
    //   description: "We build apps, custom software, provide maintenance, testing, IT resources, marketplaces, and consulting.",
    //   subheading: "Other services",
    //   content: "Web & Mobile Application Development"
    // },
  ];


  constructor(
    private ourServicesService: OurServicesService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.fetchServices();
  }



  fetchServices(){
    this.ourServicesService.getAllServices().subscribe((res)=>{
      this.ourServices = res.data.filter((item: any) => item.category !== "SAP");


    })
  }

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  readMore(service: any) {
    const rawTitle = service.title;
    const slug = this.slugify(rawTitle);

    this.ourServicesService.setService(service);
    if (service.title == "SAP Solutions"){
    this.router.navigate(['/services/sap-solutions']); 
    }
    else{
      this.router.navigate(['/services', slug]);
    }
    
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start
      .replace(/-+$/, '');         // Trim - from end
  }

}
