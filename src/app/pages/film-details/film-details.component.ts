import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmService} from '../../services/film.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent {

  filmDetails:any;
  PathPrefix: string = 'data:image/jpeg;base64,';
  comment:string='';
  constructor(private filmService: FilmService, private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.getFilmDetails();
  }
  getFilmDetails():void {
    const filmDetails=history.state.filmDetails;
    if(filmDetails){
      this.filmDetails=filmDetails;
      this.filmDetails.film.posterPath = `${this.PathPrefix}${this.filmDetails.film.posterPath}`;
      this.filmDetails.actor.forEach((actor: any) => {
        actor.photoPath = `${this.PathPrefix}${actor.photoPath}`;
      });
      //console.log(this.filmDetails.actor);
      //console.log(this.filmDetails.film.posterPath);
    }
  }

}
