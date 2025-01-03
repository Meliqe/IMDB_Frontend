import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmService} from '../../services/film.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent {

  filmDetails:any;
  PathPrefix: string = 'data:image/jpeg;base64,';
  currentUser: any =null;
  content:string = '';

  constructor(private filmService: FilmService, private route:ActivatedRoute, private router:Router , private authService : AuthService) { }
  ngOnInit(): void {
    this.getFilmDetails();
    this.currentUser = this.authService.getCurrentUser();
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

  addComment(){
    if (!this.content || this.content.trim() === '') {
      alert("Yorum boş olamaz!");
      return;
    }
    const comment = {
      userid: this.currentUser.id,
      filmid: this.filmDetails.film.filmId,
      content: this.content,
    }
    console.log(comment);
    console.log(this.currentUser);
    this.filmService.addComment(comment).subscribe({
      next:()=>{
        console.log("yorum başarıyla eklendi");
        alert("yorum başarıyla eklendi");
        this.content='';
      },
      error:()=>{
        console.error("yorum eklenirken hata!!");
        alert("yorum eklenirken hata!!");
        this.content='';
      }
    })
  }
}
