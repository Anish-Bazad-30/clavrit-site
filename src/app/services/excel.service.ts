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
  
downloadExcel(): Observable<Blob> {
  const url = `${this.apiUrl}/api/export`;
  return this.http.get(url, {
    responseType: 'blob' // Important to get file
  });
}

  
  
    importExcel(file: File): Observable<any> {
      const url = `${this.apiUrl}/api/import/upload`;
      const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(url, formData);
    }
}
