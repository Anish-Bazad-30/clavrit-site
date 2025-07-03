import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl: string = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
  
    getProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.get<any>(url);
    }
  
     createProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.post<any>(url,id);
    }
  
    updateProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.delete<any>(url);
    }
  
}
