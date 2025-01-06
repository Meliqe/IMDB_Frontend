import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string='';
  password: string='';
  errorMessage:string='';

  constructor(private authService: AuthService , private router: Router) { }

  onLogin() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.token) {
          console.log("Giriş Başarılı:" + response.token);
          this.authService.saveToken(response.token);
          const role = this.authService.getRoleFromToken(response.token);
          console.log('Role from Token:', role);
          if(role){
            if (role==='admin'){
              console.log('Admin olarak giriş yapıldı.');
              this.router.navigate(['/admin-dashboard']);
            }
            else if(role==='user'){
              const userId = this.authService.getUserIdFromToken();
              if (userId) {
                this.authService.getUserDetails(userId).subscribe({
                  next: (userDetails) => {
                    console.log('Kullanıcı bilgileri:', userDetails);
                    this.authService.setCurrentUser(userDetails);
                    this.router.navigate(['/home']);
                  },
                  error: (err) => {
                    console.error('Kullanıcı bilgileri alınırken hata:', err);
                  },
                });
              } else {
                this.errorMessage = 'Token süresi dolmuş, lütfen tekrar giriş yapın.';
                this.router.navigate(['/login']);
              }
            }
            else {
              console.error('Bilinmeyen rol:', role);
              this.router.navigate(['/login']); // Yetkisiz erişim
            }
          }
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = err.error?.message || "Geçersiz E-mail formatı.";
        } else if (err.status === 401) {
          this.errorMessage = err.error?.message || "Hatalı giriş bilgileri...";
        } else {
          this.errorMessage = err.error?.message || "Bir hata oluştu! Lütfen tekrar deneyin.";
        }
        console.error('Giriş hatası:', err);
      },
    });
  }
}
