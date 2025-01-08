import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {FilmService} from '../../services/film.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  films: any = [];

  constructor(private adminService: AdminService, private router: Router,private filmService: FilmService) {}
  ngOnInit() {
    this.filmService.getAllFilms().subscribe({
      next: data => {
        this.films = data;
        console.log(this.films);
      },
      error: err => {
       console.log("Bilgiler yüklenmedi",err);
      }
    })
  }


}
