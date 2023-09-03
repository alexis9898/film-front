import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films/films.component';
import { ManagerFilmComponent } from './components/manager-film/manager-film.component';
import { FilmsResolverService } from './resolvers/film-chang.resolver';
import { HomeComponent } from './components/home/home.component';
import { FilmComponent } from './components/film/film.component';
// import { CartComponent } from './components/cart/cart.component';
import { AuthComponent } from './components/auth/auth.component';
import { CategoryComponent } from './components/category/category.component';


const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', component: HomeComponent },
  { path: 'cat', component: CategoryComponent },
  { path: 'app/:id', component: HomeComponent },
  { path: 'cart',
    loadChildren: () => import('./components/cart/cart.module').then((m) => m.CartModule)
  },


  { path: 'auth', component: AuthComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'film-manager', component: ManagerFilmComponent },
  { path: 'film-manager/:id', component: ManagerFilmComponent, resolve:[FilmsResolverService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

