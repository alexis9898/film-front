import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmService } from './film.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Film } from '../models/film';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private filmService: FilmService
  ) {}

  shoppingCards$ = new BehaviorSubject<Cart[]>([]);

  getFilmsCart() {
    let cartStorage = localStorage.getItem('cart');
    if (!cartStorage) {
      return;
    }
    let cart = JSON.parse(cartStorage); //{productId,amount}
    let cartList: Cart[] = [];
    for (let i = 0; i < cart.length; i++) {
      this.filmService.getFilm(cart[i].filmId).subscribe((film) => {
        cartList.push(new Cart(cart[i].filmId, cart[i].quantity, film));
      });
    }
    this.shoppingCards$.next(cartList);
  }

  addFilmToCart(film: Film) {
    let cart:Cart[] = this.shoppingCards$.getValue();
    if(cart.length==0){
      cart.push({ filmId: film.id, quantity: 1, film });
      localStorage.setItem('cart', JSON.stringify(cart));
      this.shoppingCards$.next(cart);
      return;
    }
    const index = cart.findIndex((c) => c.filmId === film.id);

    if (index !== -1) {
      cart[index].quantity++;
    } else {
      cart.push({ filmId: film.id, quantity: 1, film });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.shoppingCards$.next(cart);
  }

  remove1Quantity(film: Film) {
    let cart = this.shoppingCards$.getValue();
    const index = cart.findIndex((c) => c.filmId === film.id);
    if (index == -1) return;
    cart[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFilmFromCart(film: Film) {
    let cart = this.shoppingCards$.getValue();
    let index = cart.findIndex((obj) => obj.filmId === film.id);
    if (index == -1) {
      return;
    }
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.shoppingCards$.next(cart);
  }

  removeCart() {
    localStorage.removeItem('cart');
    this.shoppingCards$.next([]);
  }
}
