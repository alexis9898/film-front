import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart[];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // this.cartService.getFilmsCart();
    this.cartService.shoppingCards$.subscribe((cart) => {
      this.cart = cart;
    });
  }
  totalPriceItem(cart: Cart) {
    return (cart.film.price * cart.quantity).toFixed(2);
  }

  //all cart price
  totalPrice() {
    let sum = 0;
    for (let i = 0; i < this.cart.length; i++) {
      sum += this.cart[i].film.price * this.cart[i].quantity;
    }
    return sum.toFixed(2);
  }
  add1q(cart: Cart) {
    this.cartService.addFilmToCart(cart.film);
  }

  remove1Q(cart: Cart) {
    this.cartService.remove1Quantity(cart.film);
  }
  removeItem(cart: Cart) {
    this.cartService.removeFilmFromCart(cart.film);
  }

  removeCart() {
    this.cartService.removeCart();
  }

  goToFilm(id: string) {
    this.router.navigate(['/film', id]);
  }

  ngOnDestroy(): void {}
}
