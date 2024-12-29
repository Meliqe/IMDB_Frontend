import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  categories: any;
  PathPrefix: string = 'data:image/jpeg;base64,';
  categoryName: string = ''; // Seçilen kategori adını tutar

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
}
