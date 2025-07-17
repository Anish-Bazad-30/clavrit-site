import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
   private editSubject = new BehaviorSubject<any>(null);
  editData$ = this.editSubject.asObservable();

  setEditData(data: any) {
    this.editSubject.next(data);
  }
}
