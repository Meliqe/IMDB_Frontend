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
  loading: boolean = true; // Yüklenme göstergesi

  constructor(private filmService: FilmService) {} // FilmService'i enjekte edin

  ngOnInit(): void {
    this.getFilms(); // Component yüklendiğinde API'den filmleri çek
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
}
