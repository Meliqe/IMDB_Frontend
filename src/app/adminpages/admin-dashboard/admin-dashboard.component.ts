import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterPipePipe} from '../../pipes/filter-pipe.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule,FilterPipePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  films: any[] = [];
  actors:any[] = [];
  searchFilmQuery: string ='';
  searchActorQuery: string ='';

  constructor(private adminService: AdminService, private router: Router,private filmService: FilmService) {}
  ngOnInit() {
    this.filmService.getAllFilms().subscribe({
      next: films => {
        this.films = films;
        console.log(this.films);
      },
      error: err => {
       console.log("Bilgiler yüklenmedi",err);
      }
    })
    this.filmService.getAllActors().subscribe({
      next: actors => {
        this.actors = actors;
        console.log(this.actors);
      },
      error: err => {
        console.error("oyuncu bilgileri yüklenemedi",err)
      }
    })
  }

  goToFilmDetails(filmId: string): void {
    this.router.navigate([`/adminfilmdetails/${filmId}`]);
  }
  goToActorDetails(id: string) {
    this.router.navigate([`/admin-actor-details/${id}`]);
  }

}
