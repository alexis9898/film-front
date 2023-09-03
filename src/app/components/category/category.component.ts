import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { FilmService } from '../../services/film.service';
import { Film } from 'src/app/models/film';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit ,OnDestroy {

  destroy$ = new Subject<boolean>();
  categories:Category[]=[];

  selectCategoryId :number | null;
  selectedAllCategory=true;
  constructor(private categoryService:CategoryService,private filmService:FilmService,private route:ActivatedRoute,private router:Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p:Params)=>{
      const id=+p['id'];
      if(id){
        this.getFilmsByCategoryId(id);
        console.log(id);
      }else{
        this.getAllFilms();
        console.log('all')
      }
    });
    this.categoryService.getAllCategories().subscribe();
    this.categoryService.allCategory$.pipe(takeUntil(this.destroy$)).subscribe(res=>{
      this.categories=res;
    });
  }

  getAllFilms(){
    this.selectedAllCategory=true;
    this.selectCategoryId=null;
    this.filmService.getFilms().subscribe();
  }

  getFilmsByCategoryId(id:number){
    this.selectCategoryId=id;
    this.selectedAllCategory=false;
    this.filmService.getFilmsByCategoryId(id).subscribe(films=>{
      this.filmService.films$.next(films);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(false);
  }
}
