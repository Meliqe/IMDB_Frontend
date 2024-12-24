import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../services/film.service';
import {CommonModule} from '@angular/common'; // Servis sınıfını import edin

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class HomeComponent implements OnInit {
  films: any = []; // Filmleri tutacak dizi
  genres: string[] = []; // Tür isimlerini tutacak dizi
  showAll: boolean = false; // Daha Fazla Göster/Daha Az Göster kontrolü
  loading: boolean = true; // Yüklenme göstergesi
  genresToShow: string[] = [];
  constructor(private filmService: FilmService) {} // FilmService'i enjekte edin


  ngOnInit(): void {
    this.getFilms(); // Component yüklendiğinde API'den filmleri çek
    this.getGenres();
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(
      (data) => {
        this.films = data; // API'den gelen filmleri atayın
        this.loading = false; // Yüklenme tamamlandı
      },
      (error) => {
        console.error('API Hatası:', error); // Hata durumunda log yazdır
        this.loading = false;
      }
    );
  }
  getGenres(): void {
    this.filmService.getAllGenres().subscribe(
      (data: any) => {
        this.genres = data.map((genre: any) => genre.genreName);  // API'den gelen tür isimlerini atayın
        this.genresToShow = this.genres.slice(0, 8);
        this.loading = false; // Yüklenme tamamlandı
      },
      (error) => {
        console.error('API Hatası:', error); // Hata durumunda log yazdır
        this.loading = false;
      }
    );
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll; // Daha Fazla Göster veya Daha Az Göster
  }
  showAllGenres(): void {
    this.genresToShow = this.genres; // Tüm türleri göster
    this.showAll = true; // Kullanıcı "Daha Fazlası" seçti
  }
}
