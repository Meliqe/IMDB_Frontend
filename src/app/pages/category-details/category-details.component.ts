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

  constructor(private router: Router, private filmService: FilmService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getFilmsByCategoryName();
  }

  getFilmsByCategoryName():void{
    const categories =history.state.filmsbycategory;
    if(categories){
      this.categories = categories;
    }
  }
}
