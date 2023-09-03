import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit {

  search: FormControl = new FormControl();
  filmsSearch:Film[]=[];

  /**
   *
   */
  constructor( private filmService:FilmService) {}
  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value.length === 0 || value==='') {
        this.filmsSearch=[];
        return;
      }
      this.filmService.getFilmsByName(value).subscribe(filmsRes=>{
        this.filmsSearch=filmsRes;
        console.log(filmsRes);
      });
    });
  }
  
}
