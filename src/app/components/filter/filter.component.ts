import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Subject, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
// import{}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  films: Film[];
  price: number;
  sort='';
  // sorts:string[]=Object.keys(sort).filter((key:any) => isNaN(Number(sort[key])));
  sorts: string[] = Object.values(sortEnum);


  filtetFilms: Film[];
  constructor(private filmService: FilmService, private categoryService:CategoryService) {}
  sortChoosen = new FormControl('');


  ngOnInit(): void {

    this.filmService.films$.subscribe(fs=>{
      this.films = fs;
      this.price=0;
      this.sort='';
      this.sorting(this.sort);
    });

    this.categoryService.CategoryFilms$.subscribe(catFilms=>{
      this.films=catFilms;
    });
  }

  changePrice(value: any) {
    value=+value;
    this.price = value;
    let filterfilms = this.films.filter((f) => {return f.price <= value});
    this.filmService.filmsChange$.next(filterfilms);
  }
  sortByPrice(bool: Boolean) {
    if (bool) this.films.sort((a, b) => a.price - b.price);
    else {
      this.films.sort((a, b) => b.price - a.price);
    }
  }

  sorting(value:string){
    switch (value) {
      case sortEnum.priceLow:
        this.sortByPrice(true);
        break;
      case sortEnum.priceHigh:
        this.sortByPrice(false);
        break;
      case sortEnum.imdb:
        this.sortByPrice(true);
        break;
      default:
        break;
    }
    this.sort=value;
    // console.log(this.sort);
    if(!this.price || this.price==0){
      this.filmService.filmsChange$.next(this.films);
    }else{
      this.changePrice(this.price);
    }
  }

}

export enum sortEnum {
  priceLow='Price low to high',
  priceHigh='Price High to Low',
  imdb='Imdb'
}
