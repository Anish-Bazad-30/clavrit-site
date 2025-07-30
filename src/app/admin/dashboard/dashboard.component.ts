import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedExcelFile: any;
  constructor(
    private http: HttpClient
  ){}
  onFileSelected(event: any) {
    this.selectedExcelFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedExcelFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedExcelFile);

    this.http.post('http://localhost:8080/api/upload', formData).subscribe({
      next: () => alert('Upload successful'),
      error: (err) => alert('Upload failed: ' + err.message)
    });
  }

  downloadFile() {
    this.http.get('http://localhost:8080/api/download', { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
