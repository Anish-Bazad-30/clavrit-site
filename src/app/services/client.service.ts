import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

private apiUrl: string = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
  
    getClient(): Observable<any> {
      const url = `${this.apiUrl}/api/clients`;
      return this.http.get<any>(url);
    }
  
     createClient(data :any): Observable<any> {
      const url = `${this.apiUrl}/api/clients`;
      return this.http.post<any>(url, data);
    }
  
    updateClient(id: any): Observable<any> {
      const url = `${this.apiUrl}/`;
      return this.http.put<any>(url,id);
    }
  
    deleteClient(id: any): Observable<any> {
      const url = `${this.apiUrl}/api/clients/${id}`;
      return this.http.delete<any>(url);
    }
}
