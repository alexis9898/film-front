import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
// import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent extends SnackBarComponent  implements OnInit, OnDestroy {

  @Input('film') film:Film;

  constructor(private cartService:CartService,private s:MatSnackBar,) {
    super(s);
  }

  onOpenSnackBar(massage:string) {
    // this._snackBar.open('added to  cart!!', 'x', {
    //   horizontalPosition: 'center',
    //   verticalPosition:'top',
    //   duration:3*1000,
    // });
    this.openSnackBar(massage);
    // .openSnackBar('added to  cart!!!!!!!');
  }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.addFilmToCart(this.film);
    this.onOpenSnackBar(this.film.name +' added to cart!');
  }

  ngOnDestroy(): void {

  }
}
