import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogConfirm } from '../../interfaces/dialog.interface';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogConfirm,
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }
  onAccpet(){
    this.dialogRef.close(true);
  }
}
