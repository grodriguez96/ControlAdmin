import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pie } from 'src/app/interfaces/pie/pie';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './status-server-dialog.component.html',
  styleUrls: ['./status-server-dialog.component.css']
})
export class StatusServerDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, pies: Pie[] }) {
  }
}
