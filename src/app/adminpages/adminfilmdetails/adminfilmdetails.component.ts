import { Component ,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilmService} from '../../services/film.service';

@Component({
  selector: 'app-adminfilmdetails',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './adminfilmdetails.component.html',
  styleUrl: './adminfilmdetails.component.css'
})
export class AdminfilmdetailsComponent {
  filmDetails: any = {};
  actorsByFilmId:any[]= [];
  isUpdateModalOpen: boolean = false;
  updatedFilm:any = {};
  availableGenres: any[] = []; // API'den gelen tüm türler
  selectedGenres: string[] = []; // Kullanıcının seçtiği türler
  isGenreDropdownOpen: boolean = false; // Tür kutusunun açık/kapalı durumu
  isActorModalOpen: boolean = false; // Modalın açık/kapalı durumu
  newActor: any = {}; // Yeni oyuncu bilgileri

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private filmService : FilmService
  ) {}

  ngOnInit(){
    const filmId = this.route.snapshot.paramMap.get('id');
    console.log(filmId);
    if (filmId) {
      this.adminService.getFilmById(filmId).subscribe((film) => {
        this.filmDetails = film;
        console.log('Film Details:', this.filmDetails);
        //console.log('Poster Path:', this.filmDetails.posterPath);
      });
    }
    if(filmId){
      this.adminService.getActorsByFilmId(filmId).subscribe((actor) => {
        this.actorsByFilmId=actor;
        console.log('gelen oyuncu bilgileri', this.actorsByFilmId);
      })
    }
    this.filmService.getAllGenres().subscribe((genres: any[]) => {
      this.availableGenres = genres;
      console.log('Available Genres:', this.availableGenres);
    });
  }

  onActorPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newActor.photoPath = reader.result as string; // Base64 verisini aktarıyoruz
        console.log('Seçilen Fotoğraf (Base64):', this.newActor.photoPath); // Kontrol için
      };
      reader.readAsDataURL(file);
    }
  }
  addActor() {
    if (!this.newActor.actorName || this.newActor.actorName.trim() === '') {
      alert('Oyuncu adı boş bırakılamaz!');
      return;
    }
    if (!this.newActor.photoPath || this.newActor.photoPath.trim() === '') {
      alert('Oyuncu fotoğrafı seçilmelidir!');
      return;
    }
    if (!this.newActor.biography || this.newActor.biography.trim() === '') {
      alert('Oyuncu biyografisi boş bırakılamaz!');
      return;
    }
    if (!this.newActor.birthDate || isNaN(new Date(this.newActor.birthDate).getTime())) {
      alert('Doğum tarihi boş bırakılamaz veya geçersiz bir tarih girdiniz!');
      return;
    }

    this.adminService.addActorToFilm(this.newActor).subscribe({
      next: (response) => {
        alert('Oyuncu başarıyla eklendi!');
        this.actorsByFilmId.push(this.newActor); // Yeni oyuncuyu listeye ekle
        this.closeActorModal(); // Modalı kapat
      },
      error: (err) => {
        console.error('Oyuncu eklenirken bir hata oluştu:', err);
        alert('Oyuncu eklenemedi. Lütfen tekrar deneyin.');
      },
    });
  }
  openActorModal() {
    this.newActor = { filmId: this.filmDetails.filmId, actorName: '', actorPhoto: '', actorBio:'',actorBirthDate: '' }; // Yeni oyuncu bilgileri
    this.isActorModalOpen = true;
  }
  closeActorModal() {
    this.isActorModalOpen = false;
    this.newActor = {};
  }
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Kullanıcının seçtiği dosya
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updatedFilm.posterPath = reader.result as string; // Base64 verisini updatedFilm'e atıyoruz
        console.log('Base64 Resim:', this.updatedFilm.posterPath); // Kontrol için
      };
      reader.readAsDataURL(file); // Resmi Base64 formatında okuyun
    }
  }
  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen; // Aç/kapa durumunu değiştir
  }
  toggleGenreSelection(genreName: string) {
    const index = this.selectedGenres.indexOf(genreName);
    if (index === -1) {
      // Eğer tür seçilmediyse, ekle
      this.selectedGenres.push(genreName);
    } else {
      // Eğer tür zaten seçiliyse, çıkar
      this.selectedGenres.splice(index, 1);
    }
    console.log('Seçilen türler:', this.selectedGenres);
  }
  openUpdateModal() {
    if (!this.filmDetails || !this.filmDetails.filmId) {
      console.error('Film bilgileri eksik veya filmId tanımlı değil!');
      return;
    }
    this.updatedFilm.genres = this.selectedGenres.map((genreName) => ({
      genreName,
    }));
    this.updatedFilm = { ...this.filmDetails };
    // Film detaylarındaki türleri seçili hale getir
    this.selectedGenres = this.filmDetails.genres.map((genre: any) => genre.genreName);
    this.isUpdateModalOpen = true; // Modalı aç
    console.log('Güncellenecek film:', this.updatedFilm);
  }
  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.updatedFilm = {};
  }
  updateFilm() {
    if (!this.updatedFilm.filmName || this.updatedFilm.filmName.trim() === '') {
      alert('Film ismi boş bırakılamaz!');
      return;
    }
    if (!this.updatedFilm.filmDescription || this.updatedFilm.filmDescription.trim() === '') {
      alert('Film açıklaması boş bırakılamaz!');
      return;
    }
    if (!this.updatedFilm.filmDuration || this.updatedFilm.filmDuration <= 0) {
      alert('Film süresi boş bırakılamaz ve sıfırdan büyük olmalıdır!');
      return;
    }
    if (this.selectedGenres.length === 0) {
      alert('En az bir tür seçmelisiniz!');
      return;
    }
    this.updatedFilm.genres = this.selectedGenres.map((genreName) => ({
      genreName, // Sadece tür adı gönderiliyor
    }));
    console.log('Gönderilen Veri:', this.updatedFilm);
    this.adminService.updateFilm(this.updatedFilm).subscribe({
      next: (updatedFilm) => {
        this.filmDetails = { ...this.filmDetails, ...updatedFilm };
        alert('Film başarıyla güncellendi!');
        this.closeUpdateModal();
        console.log("güncellendikten sonra film detayı:",this.filmDetails);
      },
      error: (err) => {
        console.error('Film güncellenirken bir hata oluştu:', err);
        alert('Film güncellenemedi. Lütfen tekrar deneyin.');
      }
    });
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
  deleteActor(actorId: string) {
    if (confirm('Bu oyuncuyu silmek istediğinize emin misiniz?')) {
      this.adminService.deleteActor(actorId).subscribe({
        next: () => {
          this.actorsByFilmId = this.actorsByFilmId.filter(actor => actor.id !== actorId);
          alert('Oyuncu başarıyla silindi!');
        },
        error: (err) => {
          console.error('Oyuncu silinirken bir hata oluştu:', err);
          alert('Oyuncu silinemedi. Lütfen tekrar deneyin.');
        }
      });
    }
  }
}
