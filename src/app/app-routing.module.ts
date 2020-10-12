import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'pie',
    loadChildren: () => import('./views/pie/pie.module').then(m => m.PieModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./views/inicio/inicio.module').then(m => m.InicioModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
