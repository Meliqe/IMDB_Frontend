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

  constructor(private authService: AuthService) { }

  onLogin(){

    if (!this.email || !this.password) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const credentials = {email:this.email, password:this.password};
    this.authService.login(credentials).subscribe(
      response=>{
        console.log('Giriş Başarılı!', response);
      },
      error=>{
        console.error('Giriş Başarısız:', error);
      }
    )
  }
}
