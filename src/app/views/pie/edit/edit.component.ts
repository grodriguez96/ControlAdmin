import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pie } from 'src/app/interfaces/pie/pie';
import { BdConnectionPieService } from 'src/app/services/pie/bd-connection-pie.service';
import { ProvidersService } from '../services/providers.service';
import { StatusServerDialog } from '../../shared/status-server-dialog/status-server-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form: FormGroup;
  isSavingForm = false;

  constructor(private provider: ProvidersService, private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router, public dialog: MatDialog) {
    this.initForm();
  }

  /** Dialog for server response message */
  openDialog(message: string, pies?: Pie[]) {
    this.dialog.open(StatusServerDialog, {
      data: {
        message: message,
        pies: pies ?? null
      }
    })
  }

  /** Create new form with the data in providerServices */
  initForm() {
    this.form = this.fb.group({
      pie: this.fb.array(
        this.provider.editData.map(pie =>
          this.fb.group({
            id: new FormControl(pie.id),
            variety: new FormControl(pie.variety, [Validators.required]),
            price: new FormControl(pie.price, [Validators.required])
          })
        )
      )
    })
  }

  /** If there are repeat pie  */
  repeatPie(): boolean {
    let x = 0, y = 0, repeat = false;
    while (x < this.form.value['pie'].length && !repeat) {
      y = 1 + x
      while (!repeat && y < this.form.value['pie'].length) {
        this.form.value['pie'][x].variety.toUpperCase() === this.form.value['pie'][y].variety.toUpperCase() ? repeat = true : y++;
      }
      x++;
    }
    return repeat;
  }

  /** connect to DB for update data */
  updatePies() {

    this.isSavingForm = true; /** Start spinner */

    if (this.form.value['pie'].length == 1) { /** If is only one data to change */
      const data: Pie = {
        variety: this.form.get('pie').value[0].variety,
        price: this.form.get('pie').value[0].price
      }
      const id = this.form.get('pie').value[0].id;

      this.connect.putPie(data, id).subscribe(servResponse => {
        this.openDialog(servResponse['message'])
        this.router.navigate(['pie'])
      }, (servResponse) => {
        this.openDialog(servResponse.error['message'])
        this.isSavingForm = false
      })

    } else { /** If data is greater than one */

      if (this.repeatPie()) {
        this.openDialog("Contiene elementos repetidos, por favor revisar nuevamente el nombre de las empanadas a ingresar")
        this.isSavingForm = false
      } else {
        this.connect.putPies(this.form.value['pie']).subscribe(servResponse => {
          this.openDialog(servResponse['message'])
          this.router.navigate(['pie'])
          this.isSavingForm = false;

        }, (servResponse) => {
          this.openDialog(servResponse.error['message'], servResponse.error['pies'])
          this.isSavingForm = false
        })
      }
    }
  }

  /** Back to home page */
  back() {
    this.router.navigate(['pie'])
  }

  get formData() {
    return <FormArray>this.form.get('pie');
  }

}
