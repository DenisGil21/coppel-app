import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './pages/aplicacion.component';
import { CoppelRoutingModule } from './coppel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AplicacionComponent
  ],
  imports: [
    CommonModule,
    CoppelRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoppelModule { }
