import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterPipePipe} from '../../pipes/filter-pipe.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule, FilterPipePipe, NgIf,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  films: any[] = [];
  actors:any[] = [];
  searchFilmQuery: string ='';
  searchActorQuery: string ='';
  addFilmObject:any={};
  availableGenres: any[] = [];
  selectedGenres: string[] = [];
  isGenreDropdownOpen: boolean = false;
  isModalOpen: boolean = false;
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
    this.filmService.getAllGenres().subscribe((genres: any[]) => {
      this.availableGenres = genres;
      console.log('Available Genres:', this.availableGenres);
    });
  }

  goToFilmDetails(filmId: string): void {
    this.router.navigate([`/adminfilmdetails/${filmId}`]);
  }
  goToActorDetails(id: string) {
    this.router.navigate([`/admin-actor-details/${id}`]);
  }

  addFilm(){
    this.addFilmObject.genres = this.selectedGenres.map((genreName) => ({
      genreName,
    }));
    this.adminService.adminAddFilm(this.addFilmObject).subscribe({
      next: film => {
        console.log('Gönderilen JSON:', this.addFilmObject);

        console.log("gönderilen parametre:",film);
        this.films.push(film);
        console.log("film eklendikten sonraki liste:",this.films);
        alert("film başarıyla eklendi");
      },
      error: err => {
        console.log("film eklenemedi",err);
        alert("Film eklerken hata ! Lütfen tekrar deneyin.")
      }
    })
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.addFilmObject.posterPath = reader.result as string;
        console.log('Base64 Resim:', this.addFilmObject.posterPath);
      };
      reader.readAsDataURL(file);
    }
  }
  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen; // Aç/kapa durumunu değiştir
  }
  toggleGenreSelection(genreName: string) {
    const index = this.selectedGenres.indexOf(genreName);
    if (index === -1) {
      this.selectedGenres.push(genreName);
    } else {
      this.selectedGenres.splice(index, 1);
    }
    console.log('Seçilen türler:', this.selectedGenres);
  }
  openModal() {
    this.isModalOpen = true;
    this.addFilmObject = { filmName:'',filmDescription:'',filmReleaseDate:'',filmDuration:0,posterPath:'',genres: this.selectedGenres.map((genreName) => ({
        genreName
      }))  };
    console.log("seçilen filmlerin ismi obje formatına dönüşmüş mü kotnrol:",this.addFilmObject.genres);
  }
  closeModal(){
    this.isModalOpen = false;
    this.addFilmObject={};
  }
}
