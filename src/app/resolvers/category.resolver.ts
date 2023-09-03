import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,  } from '@angular/router';
import { Observable, switchMap, tap, take } from 'rxjs';
import { Film } from "../models/film";
import { FilmService } from "../services/film.service";
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Injectable({providedIn:'root'})

export class FilmsResolverService implements Resolve<Film[]> {
    constructor(private filmService: FilmService, private rout: ActivatedRouteSnapshot ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
      let id=route.params['id'];
      if(id!=null){
        return this.filmService.getFilm(id).pipe(tap(film=>{
          this.filmService.filmEdit=film;
        }))
      }
      return;
    }
}
