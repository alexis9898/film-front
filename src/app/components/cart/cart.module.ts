import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: CartComponent}
];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    [RouterModule.forChild(routes)],
  ],

})



export class CartModule { }

