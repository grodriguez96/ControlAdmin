import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieComponent } from './pie.component';
import { EditComponent } from './edit/edit.component'
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: PieComponent
  },
  {
    path: 'edit',
    component: EditComponent,

  },
  {
    path: 'add',
    component: AddComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PieRoutingModule { }
