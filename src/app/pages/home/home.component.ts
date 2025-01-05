import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  films: any = [];
  genres: string[] = [];
  loading: boolean = true;
  genresToShow: string[] = [];
  filmsToShow: any[] = [];
  PathPrefix: string = 'data:image/jpeg;base64,';
  actors:any=[];
  actorsToShow:any=[];
  selectedFilm: any = null;
  rating: number = 0;
  tempRating: number = 0;
  currentUser: any = null;
  score: number = 0;

  constructor(private filmService: FilmService, private router: Router , private authService:AuthService) { }
  //routerı kullanmak istiyorsak enjecte etmemiz gerek

  ngOnInit(): void {
    this.getFilms();
    this.getGenres();
    this.getActors();
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(
      (data) => {
        this.films = data;
        this.films.forEach((film: any) => {
          if (film.posterPath) {
            film.posterPath = `${this.PathPrefix}${film.posterPath}`;
          }
        });
        this.filmsToShow=this.films.slice(0,6);
        this.loading = false;
      },
      (error) => {
        console.error('API Hatası:', error);
        this.loading = false;
      }
    );
  }

  getGenres(): void {
    this.filmService.getAllGenres().subscribe(
      (data: any) => {
        this.genres = data.map((genre: any) => genre.genreName);
        this.genresToShow = this.genres.slice(0, 9);
        console.log(this.genresToShow);
        this.loading = false;
      },
      (error) => {
        console.error('API Hatası:', error);
        this.loading = false;
      }
    );
  }

  getActors(): void {
    this.filmService.getAllActors().subscribe(
      (data) => {
        this.actors = data;
        this.actors.forEach((oyuncu: any) => {
          if (oyuncu.photoPath) {
            oyuncu.photoPath = `${this.PathPrefix}${oyuncu.photoPath}`;
          }
        });
        this.actorsToShow = this.actors.slice(0, 5);
        console.log(this.actorsToShow.length);
        this.loading = false;
      },
      (error) => {
        console.error('API Hatası:', error);
        this.loading = false;
      }
    );
  }

  onFilmClick(filmId: string): void {
    if (!filmId) {
      console.error('Film ID si gelmedi');
      return;
    }
    console.log('Tıklanılan film ID:', filmId);

    this.filmService.getFilmById(filmId).subscribe(
      (filmDetails) => {
        this.router.navigate(['/filmdetails', filmId] ,{ state: { filmDetails: filmDetails } });
      },
      (error) => {
        console.error('Film detaylarını alırken hata oluştu:', error);
      }
    );
  }

  onOyuncuClick(actorId:string): void {
    if(!actorId) {
      console.error('ActorId si gelmedi');
      return;
    }
    console.log('tıklanılan actorun idsi:',actorId);

    this.filmService.getActorById(actorId).subscribe(
      (actorDetails) => {
        console.log('Actor Details:', actorDetails);
        this.router.navigate(['/oyuncudetails', actorId], { state: { actorDetails: actorDetails } });
        console.log('Router state gönderiliyor:', { actorDetails: actorDetails });
      },
      (error) => {
        console.error('Oyuncu detaylarını alırken hata oluştu:', error);
      }
    )
  }

  onGenreClick(genre:string):void{
    this.filmService.getFilmsByCategoryName(genre).subscribe(
      (filmsbycategory)=>{
        console.log("kategoriye göre filmler:",filmsbycategory);
        this.router.navigate(['/filmsbycategoryname',genre],{state:{filmsbycategory:filmsbycategory}});
        console.log('Router state gönderiliyor:', { filmsbycategory: filmsbycategory });
      },
      (error) => {
        console.error('kategoriye göre filmler gelmedi:',error);
      }
    )
  }

  addOrUpdateRate(){
    if (!this.currentUser) {
      alert("Lütfen giriş yapın");
      this.router.navigate(['/login']);
      return;
    }
    const userid = this.currentUser.id;
    if (userid){
      const rate ={
        userid: this.currentUser.id,
        filmid: this.selectedFilm.filmId,
        score:this.rating
      };
      this.authService.addOrdUpdateRate(rate).subscribe({
        next: (result) => {
          console.log("Güncellenen veya eklenen puan:", result);
          this.resetStars(); // Yıldızları sıfırla
          this.closeModal(); // Modalı kapat
          alert("puan başarıyla verildi");
        },
        error:(err)=>{
          console.error("puan verme işlemi başarısız",err);
          alert("Puanlama kaydedilemedi. Lütfen tekrar deneyin.");        }
      })
    }
    else {
      alert("lütfen giriş yapın");
      this.router.navigate(['/login']);
    }
  }


  hoverRating(tempRating: number): void {
    this.tempRating = tempRating;
  }
  rateFilm(value: number): void {
    this.rating = value; // Kalıcı seçim
    console.log(`Seçilen puan: ${value}`);
  }
  getStarClass(index: number): string {
    return index < (this.tempRating || this.rating) ? 'active' : '';
  }
  resetStars(): void {
    this.rating = 0;
    this.tempRating = 0;
  }
  openModal(film: any): void {
    this.selectedFilm = film;
  }
  closeModal(): void {
    this.selectedFilm = null;
  }

}
