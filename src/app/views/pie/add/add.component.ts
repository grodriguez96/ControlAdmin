import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { BdConnectionPieService } from 'src/app/services/pie/bd-connection-pie.service'
import { ProvidersService } from '../services/providers.service'
import { StatusServerDialog } from '../../shared/status-server-dialog/status-server-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { Pie } from 'src/app/interfaces/pie/pie'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  form: FormGroup
  pies: FormArray
  isSavingForm = false

  constructor(private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router, private provider: ProvidersService, public dialog: MatDialog) {
    this.form = this.fb.group({
      pies: this.fb.array([this.createPie()])
    })
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

  /** Back to home page */
  back() {
    this.router.navigate(['pie'])
  }

  /** Create new formgroup and returned */
  createPie(): FormGroup {
    return this.fb.group({
      variety: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })
  }

  /** Create new input field */
  addInputPies(): void {
    this.pies = this.form.get('pies') as FormArray;
    this.pies.push(this.createPie())
  }

  /** If there are repeat pie  */
  repeatPie(): boolean {
    let x = 0, y = 0, repeat = false;
    while (x < this.form.controls['pies'].value.length && !repeat) {
      y = 1 + x
      while (!repeat && y < this.form.controls['pies'].value.length) {
        this.form.controls['pies'].value[x].variety.toUpperCase() === this.form.controls['pies'].value[y].variety.toUpperCase() ? repeat = true : y++;
      }
      x++;
    }
    return repeat;
  }

  /** Connect to DB for saving data */
  addPies() {

    if (this.repeatPie()) {
      this.openDialog("Contiene elementos repetidos, por favor revisar nuevamente el nombre de las empanadas a ingresar")
    } else {
      this.isSavingForm = true
      this.connect.postPie(this.form.value['pies']).subscribe((servResponse) => {
        this.openDialog(servResponse['message']);
        this.router.navigate(['pie'])
      },
        (servResponse) => {
          this.openDialog(servResponse.error['message'], servResponse.error['pies'])
          this.isSavingForm = false
        })
    }

  }

  get formData() {
    return <FormArray>this.form.get('pies');
  }

  delete(i: number) {
    this.pies = this.form.get('pies') as FormArray;
    this.pies.removeAt(i);
  }

}
