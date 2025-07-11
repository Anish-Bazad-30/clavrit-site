import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl: string = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
  
    getJobs(): Observable<any> {
      const url = `${this.apiUrl}/clavrit/job-details`;
      return this.http.get<any>(url);
    }
  
    getJobsDetails(): Observable<any> {
      const url = `${this.apiUrl}/clavrit/job-details`;
      return this.http.get<any>(url);
    }

     createJobs(data: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/job-details`;
      return this.http.post<any>(url,data);
    }

      createJobsMoreDetails(data: any): Observable<any> {
      const url = `${this.apiUrl}/api/job-more-details`;
      return this.http.post<any>(url,data);
    }
    
    updateJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.delete<any>(url);
    }
  
    applyJob(data: any): Observable<any> {
      const url = `${this.apiUrl}/api/job-application/apply`;
      return this.http.post<any>(url,data);
    }
}
