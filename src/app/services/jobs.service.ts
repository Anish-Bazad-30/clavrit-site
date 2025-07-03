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
  
  
    getJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.get<any>(url);
    }
  
     createJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.post<any>(url,id);
    }
  
    updateJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteJobs(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.delete<any>(url);
    }
  
}
