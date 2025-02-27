import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name:string='';
  surname:string='';
  email:string='';
  phone:string='';
  password:string='';
  errorMessage:string='';
  successMessage:string='';

  constructor(private authService: AuthService , private router: Router) { }

  onRegister(){
    const credentials = {name:this.name,surname:this.surname,email:this.email,password:this.password,phone:this.phone};
    console.log('Gönderilen veri:', credentials);
    this.authService.register(credentials).subscribe({
      next:(response)=>{
        console.log('Backend Yanıtı:', response);
        if(response.success){
          console.log('Kayıt Başarılı');
          console.log(response.token);
          this.successMessage='Kayıt başarlıyla oluşturuldu! Giriş yapabilirsiniz.';
          this.name=''; //kayıt sonrası inputlar temizlensin
          this.surname='';
          this.email='';
          this.phone='';
          this.password='';
        }
      },
      error:(err)=>{
        console.error(err);
        if(err.status === 401) {
          this.errorMessage='Kayıt oluşturulamadı!';
        }
        else{
          this.errorMessage = 'Kayıt sırasında hata...'
        }
        console.log('Kayıt Hatası'+err);
      }
    })
  }
}
