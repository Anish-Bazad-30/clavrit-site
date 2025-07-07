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
  
  
    getProjects(): Observable<any> {
      const url = `${this.apiUrl}/clavrit/projects`;
      return this.http.get<any>(url);
    }
  
    getProjectsById(id: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/projects/${id}`;
      return this.http.get<any>(url);
    }

     createProjects(data: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/projects`;
      return this.http.post<any>(url,data);
    }
  
    updateProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteProjects(id: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/projects/${id}`;
      return this.http.delete<any>(url);
    }
  
}
