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

  form: FormGroup;
  pies: FormArray;
  isSavingForm: boolean;

  constructor(private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router, private provider: ProvidersService, public dialog: MatDialog) {
    this.form = this.fb.group({
      pies: this.fb.array([this.createPie()])
    })
    this.isSavingForm = false;
  }

  openDialog(message?: string) {
    this.dialog.open(StatusServerDialog, {
      data: {
        message: message,
      },
    });
  }

  back() {
    this.router.navigate(['pie'])
  }

  createPie(): FormGroup {
    return this.fb.group({
      variety: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  addInputPies(): void {
    this.pies = this.form.get('pies') as FormArray;
    this.pies.push(this.createPie())
  }

  addPies() {
    this.isSavingForm = true;
    this.connect.postPie(this.form.value['pies']).subscribe((message) => {
      const mess = JSON.stringify(message.message)
      this.openDialog(mess.replace(/\"/g, ""))
      this.router.navigate(['pie'])
    },
      (error) => {
        this.openDialog(error.error.message)
      })
  }


  ejemplo() {
    this.isSavingForm = true;
    const pie: Pie[] = [
      { variety: "jamon y queso", price: 50 },
      { variety: "queso y cebolla", price: 50 },
      { variety: "roquefort", price: 50 },
      { variety: "carne", price: 50 },
      { variety: "pollo", price: 50 },
      { variety: "atun", price: 50 },
      { variety: "humita", price: 50 },
      { variety: "caprese", price: 50 },
      { variety: "verdura", price: 50 },
    ]
    this.connect.postPie(pie).subscribe((message) => {
      const mess = JSON.stringify(message.message)
      this.openDialog(mess.replace(/\"/g, ""))
      this.router.navigate(['pie'])
    },
      (error) => {
        this.openDialog(error.error.message)
      })
  }

}
