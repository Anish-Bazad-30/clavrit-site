import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDeleteService {

  entityName: string = '';
  data: any = null; 
  confirmCallback: () => void = () => {};

  openConfirmDelete(data: any, onConfirm: () => void) {
    //this.entityName = entityName;
    this.data = data;
    console.log(this.data);
    
    this.confirmCallback = onConfirm;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('deleteConfirmModal')
    );
    modal.show();
  }

   constructor(private http: HttpClient) {}

  deleteItem(id: number, type: string): Observable<any> {
    switch (type) {
      case 'client':
        return this.http.delete(`/api/clients/${id}`);
      case 'blog':
        return this.http.delete(`/api/blogs/${id}`);
      case 'service':
        return this.http.delete(`/api/services/${id}`);
      case 'project':
        return this.http.delete(`/api/projects/${id}`);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }
}

