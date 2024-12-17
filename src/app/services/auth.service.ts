//API isteklerini yönetmek için
import { Injectable } from '@angular/core';
import {HttpClient, HttpInterceptorFn} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ //DI sistemi tarafından kullanılmasını sağlar
  providedIn: 'root' //uygulamanın root modülüne otoatik sağlanır
})
export class AuthService {

  private apiUrl:string ="http://localhost:5286/api/user";
  constructor(private http: HttpClient) {} //HTTP isteklerini yapmak için DI kullanırlarak HTTPClient
  //enjekte edilir.

  login(credentials: { email:string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { name: string; surname:string; email:string; password: string ; phone:string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
