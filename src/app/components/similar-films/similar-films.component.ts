import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from '../../services/film.service';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-similar-films',
  templateUrl: './similar-films.component.html',
  styleUrls: ['./similar-films.component.css']
})

export class SimilarFilmsComponent implements OnInit ,OnDestroy{

  destroy$=new Subject<boolean>();
  // @Input('film') film:Film;
  similarFilms:Film[];
  selectedFilm:Film;
  category:Category;
  constructor(private filmService:FilmService,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.filmService.selectFilm$.pipe(takeUntil(this.destroy$)).subscribe(film=>{
      if(film){
        this.selectedFilm=film;
        this.category=this.randomCategory(film.categoriesModel);
        this.filmService.getFilmsByCategoryId(this.category.id).subscribe(films=>{
          this.similarFilms=this.mixArray(films);
        });
      }
    });
  }

  randomCategory(cats:Category[]){
    return cats[Math.floor(Math.random()*cats.length)];
  }
  mixArray(films:Film[]){
    let filmsLength=films.length;
    let mixFilms=[];

    for (let i = 0; i < filmsLength; i++) {
      let random=Math.floor(Math.random()*films.length);
      if(this.selectedFilm && films[random].id==this.selectedFilm.id){
        films.splice(random,1);
        continue;
      }

      mixFilms.push(films[random]);
      films.splice(random,1);
    }
    return mixFilms;
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
  }
}
