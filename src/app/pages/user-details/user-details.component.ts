import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  currentUser: any = null;
  isModalOpen: boolean = false;

  updateUserName: string = '';
  updateUserSurname: string = '';
  updateUserPhone: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.updateUserName = this.currentUser.name;
      this.updateUserSurname = this.currentUser.surname;
      this.updateUserPhone = this.currentUser.phone;
    }
  }

  logout(): void {
    this.authService.clearCurrentUser();
    this.authService.clearToken();
    this.currentUser = null;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateUser(): void {
    const updatedUser = {
      id: this.currentUser.id,
      name: this.updateUserName,
      surname: this.updateUserSurname,
      phone: this.updateUserPhone,
    };
    console.log('Gönderilen veri:', updatedUser); // Konsolda kontrol edin
    this.authService.updateUser(updatedUser).subscribe({
      next: (response) => {
        console.log('Güncellenmiş veri (backend yanıtı):', response); // Backend'den dönen veri
        this.authService.setCurrentUser(response);
        this.currentUser = response;
        alert('Profiliniz başarıyla güncellendi!');
        this.closeModal();
      },
      error: (err) => {
        console.error('Güncelleme sırasında bir hata oluştu', err);
        alert('Profil güncellenemedi, lütfen tekrar deneyin.');
      },
    });
  }
}
