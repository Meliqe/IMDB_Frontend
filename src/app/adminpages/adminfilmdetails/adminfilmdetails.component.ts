import { Component ,OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-adminfilmdetails',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
  ],
  templateUrl: './adminfilmdetails.component.html',
  styleUrl: './adminfilmdetails.component.css'
})
export class AdminfilmdetailsComponent {
  filmDetails: any = {};
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(){
    const filmId = this.route.snapshot.paramMap.get('id');
    console.log(filmId);
    if (filmId) {
      this.adminService.getFilmById(filmId).subscribe((film) => {
        this.filmDetails = film;
        console.log('Film Details:', this.filmDetails);
        console.log('Poster Path:', this.filmDetails.posterPath);
      });
    }
  }

}
