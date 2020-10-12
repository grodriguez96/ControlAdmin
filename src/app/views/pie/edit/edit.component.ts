import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pie } from 'src/app/interfaces/pie/pie';
import { BdConnectionPieService } from 'src/app/services/pie/bd-connection-pie.service';
import { ProvidersService } from '../services/providers.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form: FormGroup;


  constructor(private provider: ProvidersService, private fb: FormBuilder, private connect: BdConnectionPieService, private router: Router) {
    this.initForm();
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

      this.connect.putPie(data, id).subscribe(status => {
        if (status['status'] == 200) {
          this.provider.editData = [];
          this.provider.editStatus = false;
          this.router.navigate(['pie'])
        } else alert('NO SE PUEDO ACTUALIZAR')
      })

    } else {
      this.connect.putPies(this.form.value['pie']).subscribe(status => {
        if (status['status'] == 200) {
          this.provider.editData = [];
          this.provider.editStatus = false;
          this.router.navigate(['pie'])
        } else alert('NO SE PUEDO ACTUALIZAR')
      })
    }

  }

}
