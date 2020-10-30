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
  openDialog(message: string) {
    this.dialog.open(StatusServerDialog, {
      data: {
        message: message
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

  /** connect to DB for update data */
  updatePies() {
    this.isSavingForm = true; /** Start spinner */

    if (this.form.value['pie'].length == 1) { /** If is only one data to change */
      const data: Pie = {
        variety: this.form.get('pie').value[0].variety,
        price: this.form.get('pie').value[0].price
      }
      const id = this.form.get('pie').value[0].id;

      this.connect.putPie(data, id).subscribe(message => {
        const mess = JSON.stringify(message.message)
        this.openDialog(mess.replace(/\"/g, ""))
        this.router.navigate(['pie'])
      }, (error) => {
        this.openDialog(error.error.message)
        this.isSavingForm = false
      })

    } else { /** If data is greater than one */
      this.connect.putPies(this.form.value['pie']).subscribe(message => {
        const mess = JSON.stringify(message.message)
        this.openDialog(mess.replace(/\"/g, ""))
        this.router.navigate(['pie'])

      }, (error) => {
        this.openDialog(error.error.message)
        this.isSavingForm = false
      })
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
