import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { Pie } from 'src/app/interfaces/pie/pie';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pie: Pie[], view: string }) {
  }

  result$ = from([true, false]);

  clay() {
    this.result$.subscribe(console.log)
  }



}
