import { Component, Input } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent {
  @Input('film') film:Film;
  @Input() type :string
}
