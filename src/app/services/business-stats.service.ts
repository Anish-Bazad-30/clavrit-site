import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessStatsService {

  private baseUrl = environment.apiUrl;
constructor(private http: HttpClient) {}


  getAllStats(): Observable<any> {
     const url = this.baseUrl+"/api/stats"
    return this.http.get<any>(url);
  }

  /** GET single stat by ID */
  getStatById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /** CREATE stat with image */
  createStat(title: string, value: string, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('value', value);
    if (imageFile) {
      formData.append('images', imageFile);
    }
const url = this.baseUrl+"/api/stats";
    return this.http.post(url, formData);
  }

  /** UPDATE stat by ID with optional image */
  updateStat(id: number, title: string, value: string, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('value', value);
    if (imageFile) {
      formData.append('images', imageFile);
    }
    const url = this.baseUrl+`/api/stats/${id}`;
    return this.http.put(url, formData);
  }

  /** DELETE stat */
  deleteStat(id: number): Observable<any> {
    const url = this.baseUrl+`/api/stats/${id}`;
    return this.http.delete(url);
  }
}