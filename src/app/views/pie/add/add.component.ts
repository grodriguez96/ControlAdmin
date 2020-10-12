import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BdConnectionPieService } from 'src/app/services/pie/bd-connection-pie.service';
import { ProvidersService } from '../services/providers.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  form: FormGroup;
  pies: FormArray;

  constructor(private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router, private provider: ProvidersService) {
    this.form = this.fb.group({
      pies: this.fb.array([this.createPie()])
    })
  }

  createPie(): FormGroup {
    return this.fb.group({
      variety: '',
      price: ''
    });
  }

  addInputPies(): void {
    this.pies = this.form.get('pies') as FormArray;
    this.pies.push(this.createPie())
  }

  addPies() {
    this.connect.postPie(this.form.value['pies']).subscribe(status => {
      if (status['status'] == 200) {
        this.provider.addStatus = false;
        this.router.navigate(['pie'])
      } else alert("NO SE PUEDO AGREGAR")
    })

  }

}
