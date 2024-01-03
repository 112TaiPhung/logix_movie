import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.scss'],
})
export class DialogDeleteConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.dialogRef.close(true);
  }
}
