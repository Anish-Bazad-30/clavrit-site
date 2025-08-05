import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements  OnInit{
  selectedExcelFile: any;
  role:any;
  constructor(
    private http: HttpClient,
    private excelService: ExcelService,
    private toastService: ToastService
  ){}
  ngOnInit() {
     this.role = sessionStorage.getItem('role');
    
  }
  onFileSelected(event: any) {
    this.selectedExcelFile = event.target.files[0];
    console.log(this.selectedExcelFile);
    
  }

  uploadExcel(): void {
    if (this.selectedExcelFile) {
      this.excelService.importExcel(this.selectedExcelFile).subscribe({
        next: (res:any) => {
          this.toastService.showToast('Uploaded successfully', 'success', 3000);
        },
        error: (err:any) => {
          console.error('Upload Error:', err);
        }
      });
    }
  }

  onExportClick(): void {
  this.excelService.downloadExcel().subscribe({
    next: (data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exportdata.xlsx'; // file name
      a.click();
      window.URL.revokeObjectURL(url); // free memory
    },
    error: (err:any) => {
      console.error('Export failed:', err);
    }
  });
}

}
