import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';
import { Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() drawerEvent = new EventEmitter();

  search: FormControl = new FormControl();
  filmsSearch:Film[]=[];
  user?:User | null;
  constructor(private cartService:CartService,private authService:AuthService,private router:Router, private filmService:FilmService) {}
  cart:Cart[];

  ngOnInit(): void {
    // for (let i = 0; i < array.length; i++) {

    // }
    this.authService.smartPlay(265).subscribe(res=>{
      console.log(res);
    });
    this.cartService.getFilmsCart();
    this.cartService.shoppingCards$.subscribe(c=>{
      this.cart=c;
    });
    this.authService.autoLoging();
    this.authService.user$.subscribe(res=>{
        this.user=res;
        console.log(this.user);
      }
    );
  }

  loginOut(){
    this.user?this.authService.autoOut():this.router.navigate(['/auth']);
  }

  drawer(){
    this.drawerEvent.emit();
  }

  ngOnDestroy(): void {

  }

}
