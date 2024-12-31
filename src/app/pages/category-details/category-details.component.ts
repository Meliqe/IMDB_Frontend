import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  categories: any;
  PathPrefix: string = 'data:image/jpeg;base64,';
  categoryName: string = ''; // Seçilen kategori adını tutar
  selectedFilm: any = null;
  rating: number = 0;
  tempRating: number = 0; // Geçici puan (hover için)

  constructor(private router: Router, private filmService: FilmService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getFilmsByCategoryName();
    this.getCategoryName();
  }
  getCategoryName(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || 'Kategori Adı';
  }
  getFilmsByCategoryName():void{
    const categories =history.state.filmsbycategory;
    if(categories){
      this.categories = categories;
      console.log(this.categories);
      this.categories.forEach((film: any) => {
        if (film.posterPath) {
          film.posterPath = `${this.PathPrefix}${film.posterPath}`;
        }
      });
    }
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


  submitRating(): void {
    console.log(`${this.selectedFilm.filmName} için verilen puan: ${this.rating}`);
    this.resetStars(); // Yıldızları sıfırla
    this.closeModal(); // Modalı kapat
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
