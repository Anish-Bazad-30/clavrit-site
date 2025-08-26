import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBlogBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs/slug`;
    return this.http.get<any>(url, { params: { slug: slug } });
  }
  getBlogs(): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs`;
    return this.http.get<any>(url);
  }

   createBlogs(data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs`;
    return this.http.post<any>(url,data);
  }
 createMedia(data: any): Observable<any> {
    const url = `${this.apiUrl}/clavrit/blogs/media/upload`;
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


    private subject = new BehaviorSubject<any>(null);  // You can type this (e.g., BehaviorSubject<MyDataType>)
  sharedData$ = this.subject.asObservable();         // Observable for other components

  setData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }

   private recentBlogsubject = new BehaviorSubject<any>(null);  // You can type this (e.g., BehaviorSubject<MyDataType>)
  recentBlogSharedData$ = this.recentBlogsubject.asObservable();         // Observable for other components

  setRecentBlogData(data: any) {
    this.recentBlogsubject.next(data);
  }

  clearRecentBlogData() {
    this.recentBlogsubject.next(null);
  }

  private previewBlogSubject = new BehaviorSubject<any>(null);  // You can type this (e.g., BehaviorSubject<MyDataType>)
  previewBlogSharedData$ = this.previewBlogSubject.asObservable();         // Observable for other components
  
  setPreviewBlogData(data: any) {
    this.previewBlogSubject.next(data);
  }

  clearPreviewBlogData() {
    this.previewBlogSubject.next(null);
  }
}
