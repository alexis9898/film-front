import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmComponent } from './components/film/film.component';
import { CategoryComponent } from './components/category/category.component';
import { FilterComponent } from './components/filter/filter.component';
import { ManagerFilmComponent } from './components/manager-film/manager-film.component';
import { ManagerCategoryComponent } from './components/manager-category/manager-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { FilmService } from './services/film.service';
import { ImageService } from './services/image.service';
import { CartService } from './services/cart.service';
//import { CartComponent } from './components/cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './components/home/home.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { SimilarFilmsComponent } from './components/similar-films/similar-films.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { SliderDemoComponent } from './components/slider-demo/slider-demo.component';
import { AuthComponent } from './components/auth/auth.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SearchComponent } from './components/search/search.component';
import { CartModule } from './components/cart/cart.module';

@NgModule({
  declarations: [
    SliderDemoComponent,
    AppComponent,
    HeaderComponent,
    FilmsComponent,
    FilmComponent,
    CategoryComponent,
    FilterComponent,
    ManagerFilmComponent,
    ManagerCategoryComponent,
    HomeComponent,
    AddToCartButtonComponent,
    SimilarFilmsComponent,
    FilmCardComponent,
    AuthComponent,
    SnackBarComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSidenavModule,

  ],
  providers: [
    CategoryService,
    CartService,
    FilmService,
    AuthService,
    ImageService,
    CookieService,
    SnackBarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
