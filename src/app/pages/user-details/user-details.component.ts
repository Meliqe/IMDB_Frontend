import { Component,OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule], //ng direktiflerini kullanmak için
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  currentUser: any =null;
constructor(private authService:AuthService , private router:Router) {
}
ngOnInit():void{
  this.currentUser=this.authService.getCurrentUser();
  if (!this.currentUser) {
    this.router.navigate(['/login']);
  }
}


}
