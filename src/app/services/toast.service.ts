import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
showToast(message: string, type: 'success' | 'error' = 'success', duration: number = 5000) {
    const toast = document.createElement('div');

    toast.className = `custom-toast toast-${type}`;
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10); 

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300); 
    }, duration);
  }
}
