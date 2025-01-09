import { Component,OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-actor-details',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-actor-details.component.html',
  styleUrl: './admin-actor-details.component.css'
})
export class AdminActorDetailsComponent {
constructor(private adminService: AdminService,  private route: ActivatedRoute,private filmService: FilmService , private router : Router) {}

  actorDetails: any={};
  updatedActorDetails: any ={};
  isModalOpen: boolean = false;

  ngOnInit() {
   const id = this.route.snapshot.params['id'];
   if(id){
     this.filmService.getActorById(id).subscribe({
       next: actor => {
         this.actorDetails=actor;
         this.updatedActorDetails= this.actorDetails;
         console.log("ilgili oyunucunun bilgileri:",this.actorDetails);
       },
       error: err => {
         console.log("ilgili oyuncunun bilgileri yüklenemedi!",err);
       }
     }
     )
   }
  }
  openUpdateModal() {
    this.isModalOpen = true;
    this.updatedActorDetails = {... this.actorDetails};
    console.log('Güncellenecek oyuncu:', this.updatedActorDetails);
  }
  closeUpdateModal() {
    this.isModalOpen = false;
    this.updatedActorDetails = {};
  }
  updateActorDetails() {
    if (!this.updatedActorDetails.actorName || this.updatedActorDetails.actorName.trim() === '') {
      alert('Oyuncu adı boş bırakılamaz!');
      return;
    }
    if (!this.updatedActorDetails.biography || this.updatedActorDetails.biography.trim() === '') {
      alert('Oyuncu biyografisi boş bırakılamaz!');
      return;
    }
    this.adminService.updateActor(this.updatedActorDetails).subscribe({
      next: (updatedActor) => {
        this.actorDetails={...this.actorDetails , ...this.updatedActorDetails};
        alert('Oyuncu bilgileri başarıyla güncellendi!');
        this.closeUpdateModal();
        console.log("güncellendikten sonra film detayı:",this.actorDetails);
      },
      error: err => {
        console.log("Oyuncu bilgilerini güncellerken hata",err);
        alert("oyuncu bilgileri güncellenemedi, lütfen tekrar deneyeniz!")
      }
    })
  }
  deleteActor(){
    const actorId = this.actorDetails.id;
    if(confirm("bu oyuncuyu silmek istediğinize emin misiniz?")){
      this.adminService.deleteActor(actorId).subscribe({
        next:()=>{
          console.log("oyuncu silindi");
          alert("oyuncu silindi!");
          this.router.navigate(['/admin-dashboard']);
        },
        error: err => {
          console.log("oyuncu silinrken hata",err);
          alert("oyuncu silinemedi , lütfen tekrar deneyin");
        }
      })
    }
  }
  onActorPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updatedActorDetails.photoPath = reader.result as string; // Base64 verisini aktarıyoruz
        //console.log('Seçilen Fotoğraf (Base64):', this.updatedActorDetails.photoPath); // Kontrol için
      };
      reader.readAsDataURL(file);
    }
  }
}
