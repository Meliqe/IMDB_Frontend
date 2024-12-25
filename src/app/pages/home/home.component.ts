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
  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
    this.getGenres();
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(
      (data) => {
        this.films = data;
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

  ScrollRight(){
    const currentLastFilm = this.filmsToShow[this.filmsToShow.length - 5];
    const currentFilms = [...this.filmsToShow];
    currentFilms.shift(); // İlk kategoriyi çıkar
    currentFilms.push(this.films[this.films.indexOf(currentLastFilm) + 5] || this.films[0]);
    this.filmsToShow = [...currentFilms];
  }
  ScrollLeft(){
    const currentFirstFilm = this.filmsToShow[0];
    const currentFilms = [...this.filmsToShow];
    currentFilms.pop();
    currentFilms.unshift(this.films[this.films.indexOf(currentFirstFilm) - 5] || this.films[this.films.length - 5]);
    this.filmsToShow =[...currentFilms];
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
