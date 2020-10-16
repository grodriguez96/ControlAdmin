import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieRoutingModule } from './pie-routing.module';
import { PieComponent } from './pie.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

//** Angular Material */
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [PieComponent, EditComponent, AddComponent],
  imports: [
    CommonModule,
    PieRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class PieModule { }
