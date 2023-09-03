import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Film } from 'src/app/models/film';
import { Subject } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  
  id:number;
  film:Film;
  desctroy$ = new Subject<boolean>();
  categories:Category[]=[];

  constructor(private filmService:FilmService,private route:ActivatedRoute, private categoryService:CategoryService ){}

  ngOnInit(): void {
    this.route.params.subscribe((p:Params)=>{
      this.id=+p['id'];
      this.filmService.getFilm(this.id).subscribe(f=>{
        this.film=f;
        this.filmService.selectFilm$.next(f);
        console.log(f);
        this.categoryService.getCategoriesFilm(f.id).subscribe(cats=>{
          this.categoryService.categoriesFilm$.next(cats);
          this.categories=cats;
          console.log(cats);
        });
      });
    });


  }
  randomCategories(){

  }

}
