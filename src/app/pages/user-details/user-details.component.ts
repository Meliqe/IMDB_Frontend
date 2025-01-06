import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {elementAt} from 'rxjs';

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
  comments: any = [];
  PathPrefix: string = 'data:image/jpeg;base64,';
  content:string='';
  editingComment: any = null; // Şu anda düzenlenen yorum
  userList: any = [];
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
    this.showUserComments();
    this.getUserWatchList();
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

  toggleExpand(comment: any) {
    comment.expanded = !comment.expanded; // Genişletme/daraltma işlemi
  }

  showUserComments(){
    const userId = this.currentUser.id;
    this.authService.getCommentsByUserId(userId).subscribe({
      next:(response) => {
        console.log(response);
        this.comments=response;
      },
      error:(err)=>{
        console.log(err);
      }
    })
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

  enableEditComment(comment: any): void {
    comment.isEditing = true; // Düzenleme modunu aç
    this.editingComment = comment; // Şu anda düzenlenen yorumu ayarla
  }

  saveComment(comment: any): void {
    if (!comment.newContent) {
      alert('Yorum içeriği boş olamaz!');
      return;
    }

    const editRequest = {
      commentId: comment.commentId,
      userId: this.currentUser.id,
      content: comment.newContent,
    };

    this.authService.editComment(editRequest).subscribe({
      next: (updatedComment) => {
        comment.content = updatedComment.content; // Güncellenen içeriği ayarla
        comment.isEditing = false; // Düzenleme modunu kapat
        this.editingComment = null;
        alert('Yorum başarıyla güncellendi!');
      },
      error: (err) => {
        console.error('Yorum güncellenirken hata oluştu:', err);
        alert('Yorum güncellenemedi.');
      },
    });
  }

  cancelEditComment(comment: any): void {
    comment.isEditing = false; // Düzenleme modunu kapat
    comment.newContent = comment.content; // İçeriği eski haline getir
    this.editingComment = null;
  }

  getUserWatchList(){
    const userId = this.currentUser.id;
    this.authService.getUserWatchList(userId).subscribe({
      next:(data )=> {
        console.log(data);
        this.userList=data;
        this.userList.forEach((film: any) => {
          film.posterPath = `${this.PathPrefix}${film.posterPath}`;
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
