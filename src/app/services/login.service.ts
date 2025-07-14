import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private apiUrl: string = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
  
    onLogin(data:any): Observable<any> {
      const url = `${this.apiUrl}/api/auth/login`;
      return this.http.post<any>(url,data);
    }
}
