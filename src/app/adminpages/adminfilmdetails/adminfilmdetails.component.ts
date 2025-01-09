import { Component ,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private adminService: AdminService,
    private router: Router
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

  updateFilm(){

  }
  deleteFilm(){
    const filmId = this.filmDetails.filmId;
    if(confirm("Bu filmi silmek istediğinize emin misiniz?")){
      this.adminService.deleteFilm(filmId).subscribe({
        next:()=>{
          console.log("ilgili film silindi");
          alert('Film başarıyla silindi!');
          this.router.navigate(['/admin-dashboard']);
        },
        error:(e)=>{
          console.error("film silerken hata ",e);
          alert('Film silinemedi. Lütfen tekrar deneyin.');
        }
      })
    }
  }
}
