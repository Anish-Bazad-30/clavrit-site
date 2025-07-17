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


  getBlogs(): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs`;
    return this.http.get<any>(url);
  }

   createBlogs(data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs`;
    return this.http.post<any>(url,data);
  }

  updateBlogs(id: any, data:any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs/${id}`;
    return this.http.put<any>(url,data);
  }

  deleteBlogs(id: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs/${id}`;
    return this.http.delete<any>(url);
  }

}
