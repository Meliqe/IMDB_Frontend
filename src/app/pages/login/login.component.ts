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

  onLogin(){
    const credentials = {email:this.email, password:this.password};
    this.authService.login(credentials).subscribe({
      next:(response)=>{
        if(response.token){
          console.log("Giriş Başarılı:"+response.token);
          this.errorMessage='';
          this.router.navigate(['/deneme']);
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = err.error?.message || "Geçersiz E-mail formatı.";
        }else if(err.status === 401) {
          this.errorMessage = err.error?.message || "Hatalı giriş bilgileri...";
        }
        else {
          this.errorMessage = err.error?.message || "Bir hata oluştu! Lütfen tekrar deneyin.";
        }
        console.error('Giriş hatası:', err);
      }
    })
  };
}
