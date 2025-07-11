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
  
  
    getContact(): Observable<any> {
      const url = `${this.apiUrl}/clavrit/contact`;
      return this.http.get<any>(url);
    }

    getContactById(id: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/contact/${id}`;
      return this.http.get<any>(url);
    }
  
     createContact(data: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/contact/send`;
      return this.http.post<any>(url,data);
    }
  
    updateContact(id: any,data :any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/contact/${id}`;
      return this.http.put<any>(url,data);
    }
  
    deleteContact(id: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/contact/${id}`;
      return this.http.delete<any>(url);
    }
  
}
