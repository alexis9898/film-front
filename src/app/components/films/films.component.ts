import { Component, OnInit, OnDestroy } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from '../../services/film.service';
import { Subject, tap, takeUntil, Subscription } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  films: Film[];
  film: Film;
  subscription: Subscription;
  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    // this.filmService.getFilms().subscribe();

    this.filmService
      .filmsChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((films) => {
        this.films = films;
        console.log(films);
      });
    }

    ngOnDestroy(): void {
    // this.subscription.unsubscribe();
      this.destroy$.next();
    // this.destroy$.complete();
  }
}
