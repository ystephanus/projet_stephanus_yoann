import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes= [
  {path: '', component: PanierComponent},
]

@NgModule({
  declarations: [
    PanierComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class ModPanierModule { }
