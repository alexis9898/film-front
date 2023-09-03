import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, Subject, distinct } from 'rxjs';
import { Film } from '../models/film';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  filmsChange$ = new BehaviorSubject<Film[]>([]);
  films$ = new BehaviorSubject<Film[]>([]);
  selectFilm$=new BehaviorSubject<Film | null>(null);
  categoriesFilm:Category;
  // selectFilm:Film;
  filmEdit: Film;
  constructor(private http: HttpClient) {}

  getFilms() {
    return this.http.get<Film[]>('https://localhost:44318/api/film').pipe(
      tap((films) => {
        this.filmsChange$.next(films);
        this.films$.next(films);
      })
    );
  }
  getFilmsByCategoryId(id:number) {
    return this.http.get<Film[]>('https://localhost:44318/api/film/by-catrgoryId/'+id).pipe();
  }

  getFilmsByName(name:string) {
    return this.http.get<Film[]>('https://localhost:44318/api/film/by-name/'+name).pipe();
  }


  getFilm(filmId: number) {
    return this.http.get<Film>('https://localhost:44318/api/film/' + filmId);
  }
  addFilm(film: Film) {
    return this.http.post<Film>('https://localhost:44318/api/film', film);
  }

  updateFilm(film: Film) {
    return this.http.put<Film>(
      'https://localhost:44318/api/film/' + film.id,
      film
    );
  }
  deleteFilm(film: Film) {
    return this.http.delete<Film>(
      'https://localhost:44318/api/film/' + film.id
    );

  }
  // this.http.get<{characters: {species: string}}>("").subscribe(v=>{
  //   let uniqueSpecies = v.characters.species.filter(distinct);
  // }
  // )
}
``
