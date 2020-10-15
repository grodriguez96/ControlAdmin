import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pie } from 'src/app/interfaces/pie/pie';
import { BdConnectionPieService } from 'src/app/services/pie/bd-connection-pie.service';
import { ProvidersService } from '../services/providers.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form: FormGroup;


  constructor(private provider: ProvidersService, private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router, public dialog: MatDialog) {
    this.initForm();
  }

  openDialog(message: string, error: boolean) {
    const resultD = this.dialog.open(ErrorDialogComponent, {
      data: {
        error: error,
        message: message,
      },
    });
    return resultD;
  }

  initForm() {
    this.form = this.fb.group({
      pie: this.fb.array(
        this.provider.editData.map(pie =>
          this.fb.group({
            id: [pie.id],
            variety: [pie.variety],
            price: [pie.price],
          })
        )
      )
    })
  }

  onUpdate() {
    if (this.form.value['pie'].length == 1) {
      const data: Pie = {
        variety: this.form.get('pie').value[0].variety,
        price: this.form.get('pie').value[0].price
      }
      const id = this.form.get('pie').value[0].id;

      this.connect.putPie(data, id).subscribe((message) => {
        this.openDialog("Dato modificado satifactoriamente", false)
        this.router.navigate(['pie'])
        console.log(message)
      }, (error) => {
        this.openDialog(error.error.message, true)
      })

    } else {
      this.connect.putPies(this.form.value['pie']).subscribe(() => {
        this.openDialog("Datos modificados satifactoriamente", false)
        this.router.navigate(['pie'])

      }, (error) => {
        this.openDialog(error.error.message, true)
      })
    }

  }

}
