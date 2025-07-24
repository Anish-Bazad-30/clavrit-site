import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
 private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
    downloadExcel(): Observable<any> {
      const url = `${this.apiUrl}/api/export`;
      return this.http.get<any>(url);
    }
  
  
    importExcel(data: any): Observable<any> {
      const url = `${this.apiUrl}/clavrit/job-details`;
      return this.http.post<any>(url, data);
    }
}
