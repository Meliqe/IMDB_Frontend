import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {response} from 'express';
import {NgIf} from '@angular/common';

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

  constructor(private authService: AuthService) { }

  onLogin(){

    if (!this.email || !this.password) {
      this.errorMessage="Lütfen tüm alanları doldurun..."
      return;
    }

    const credentials = {email:this.email, password:this.password};
    this.authService.login(credentials).subscribe({
      next:(response)=>{
        if(response.token){
          console.log("Giriş Başarılı:"+response.token);
          this.errorMessage='';
        }
        else {
          console.error("Token alınamadı.");
          this.errorMessage = 'Geçersiz e-mail veya şifre!';
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = "Geçersiz E mail formatı";
        } else {
          this.errorMessage = 'Bir hata oluştu! Lütfen tekrar deneyin.';
        }
        console.error('Giriş hatası:', err);
      }
    })
  };
}
