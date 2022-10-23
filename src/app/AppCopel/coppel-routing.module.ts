import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './pages/aplicacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'coppel',
        component: AplicacionComponent
      },
      {
        path: '**',
        redirectTo: 'coppel'
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CoppelRoutingModule { }
