import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {
   getOurServicesBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}/api/services/slug`;
    return this.http.get<any>(url, { params: { slug: slug } });
  }
   private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) { }
  
  private selectedService: any;

  setService(data: any) {
    this.selectedService = data;
  }

  getService() {
    return this.selectedService;
  }

  getServicesById(id: any): Observable<any> {
      const url = `${this.apiUrl}/api/services/${id}`;
      return this.http.get<any>(url);
    }

    getAllServices(): Observable<any> {
      const url = `${this.apiUrl}/api/services/`;
      return this.http.get<any>(url);
    }

     createService(data: any): Observable<any> {
      const url = `${this.apiUrl}/api/services/`;
      return this.http.post<any>(url,data);
    }
  
    updateService(id: any,data:any): Observable<any> {
      const url = `${this.apiUrl}/api/services/${id}`;
      return this.http.put<any>(url,data);
    }
  
    deleteService(id: any): Observable<any> {
      const url = `${this.apiUrl}/api/services/${id}`;
      return this.http.delete<any>(url);
    }

}
