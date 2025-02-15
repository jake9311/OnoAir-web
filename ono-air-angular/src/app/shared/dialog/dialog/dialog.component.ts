import { Component,Inject } from '@angular/core';
import { MatDialogRef,MatDialogActions,MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-dialog',
  imports: [MatDialogActions,MatDialogContent,MatIcon],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title:string;message:string}) {}

closeDialog(result: boolean): void {
  this.dialogRef.close(result);
}




}
