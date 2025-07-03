import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
  
    getContact(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.get<any>(url);
    }
  
     createContact(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.post<any>(url,id);
    }
  
    updateContact(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteContact(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.delete<any>(url);
    }
  
}
