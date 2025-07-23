import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getTech(): Observable<any> {
    const url = `${this.apiUrl}/clavrit/technologies/`;
    return this.http.get<any>(url);
  }

  getTechById(id: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/technologies/${id}`;
    return this.http.get<any>(url);
  }

  createTech(data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/technologies/`;
    return this.http.post<any>(url, data);
  }

  updateTech(id: any, data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/technologies/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteTech(id: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/technologies/${id}`;
    return this.http.delete<any>(url);
  }
}
