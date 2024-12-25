import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { CommonModule } from '@angular/common'; // Servis sınıfını import edin

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
  posterPathPrefix: string = 'data:image/jpeg;base64,';

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
    this.getGenres();
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(
      (data) => {
        this.films = data;
        this.films.forEach((film: any) => {
          if (film.posterPath) {
            film.posterPath = `${this.posterPathPrefix}${film.posterPath}`;
          }
        });
        console.log(this.films);
        this.filmsToShow=this.films.slice(0,6);
        console.log('Gösterilen Filmler:', this.filmsToShow); // Gösterilen filmleri kontrol edin
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
        this.genresToShow = this.genres.slice(0, 5);
        this.loading = false;
      },
      (error) => {
        console.error('API Hatası:', error);
        this.loading = false;
      }
    );
  }

  ScrollRight() {
    // `this.filmsToShow` listesinin son filminden sonraki filmi al
    const lastFilmIndex = this.films.indexOf(this.filmsToShow[this.filmsToShow.length - 1]);

    // Sonraki filmleri al ve ekle, eğer sona ulaşıldıysa başa dön
    const nextFilmIndex = (lastFilmIndex + 1) % this.films.length; // Modulus ile döngü sağlanır
    const nextFilm = this.films[nextFilmIndex];

    // İlk filmi çıkar ve yeni filmi ekle
    this.filmsToShow.shift();
    this.filmsToShow.push(nextFilm);
  }

  ScrollLeft() {
    // `this.filmsToShow` listesinin ilk filminden önceki filmi al
    const firstFilmIndex = this.films.indexOf(this.filmsToShow[0]);

    // Önceki filmleri al ve ekle, eğer başa ulaşıldıysa sona dön
    const prevFilmIndex = (firstFilmIndex - 1 + this.films.length) % this.films.length; // Modulus ile negatif index'ler önlenir
    const prevFilm = this.films[prevFilmIndex];

    // Son filmi çıkar ve yeni filmi başa ekle
    this.filmsToShow.pop();
    this.filmsToShow.unshift(prevFilm);
  }


  onLeftArrowClick() {
    const currentFirstGenre = this.genresToShow[0];
    const currentGenres = [...this.genresToShow];

    currentGenres.pop(); // Son kategoriyi çıkar
    currentGenres.unshift(this.genres[this.genres.indexOf(currentFirstGenre) - 1] || this.genres[this.genres.length - 1]); // Döngüsel kaydırma
    this.genresToShow = [...currentGenres]; // Yeni dizi
  }

  onRightArrowClick() {
    const currentLastGenre = this.genresToShow[this.genresToShow.length - 1];
    const currentGenres = [...this.genresToShow];

    currentGenres.shift(); // İlk kategoriyi çıkar
    currentGenres.push(this.genres[this.genres.indexOf(currentLastGenre) + 1] || this.genres[0]);
    this.genresToShow = [...currentGenres];
  }
  onCategoryClick(genre: string): void {
    console.log('Selected Category:', genre);
  }
}
