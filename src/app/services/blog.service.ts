import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getBlogs(id: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.get<any>(url);
  }

   createBlogs(id: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.post<any>(url,id);
  }

  updateBlogs(id: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.put<any>(url,id);
  }

  deleteBlogs(id: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.delete<any>(url);
  }

}
