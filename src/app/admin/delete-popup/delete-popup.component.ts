import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
   @Input() entityName: string = '';
  @Input() data: any;
  @Input() onConfirm: () => void = () => {};



  closeModal() {
    const modalEl = document.getElementById('globalDeleteModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }

  confirm() {
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.closeModal();
  }
}
