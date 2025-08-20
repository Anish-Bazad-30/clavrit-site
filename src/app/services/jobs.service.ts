import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getjobBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}/clavrit/job-details/slug`;
    return this.http.get<any>(url, { params: { slug: slug } });
  }


  getJobs(): Observable<any> {
    const url = `${this.apiUrl}/clavrit/job-details`;
    return this.http.get<any>(url);
  }


  createJobs(data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/job-details`;
    return this.http.post<any>(url, data);
  }



  updateJobs(id: any, data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/job-details/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteJobs(id: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/job-details/${id}`;
    return this.http.delete<any>(url);
  }

  applyJob(data: any): Observable<any> {
    const url = `${this.apiUrl}/api/job-application/apply`;
    return this.http.post<any>(url, data);
  }

  getJobsApplications(): Observable<any> {
    const url = `${this.apiUrl}/api/job-application/all`;
    return this.http.get<any>(url);
  }

  deleteJobsApplication(id: any): Observable<any> {
    const url = `${this.apiUrl}/api/job-application/${id}`;
    return this.http.delete<any>(url);
  }


  private subject = new BehaviorSubject<any>(null);  // You can type this (e.g., BehaviorSubject<MyDataType>)
  sharedData$ = this.subject.asObservable();         // Observable for other components

  setData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }
}
