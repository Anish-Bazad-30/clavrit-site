import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
 @Input() type: string = '';
  @Input() id!: number;

  @Output() confirmed = new EventEmitter<{ type: string, id: number }>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit({ type: this.type, id: this.id });
  }

  cancel() {
    this.cancelled.emit();
  }
}
