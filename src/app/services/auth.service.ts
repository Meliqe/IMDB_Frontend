import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ //DI sistemi tarafından kullanılmasını sağlar
  providedIn: 'root' //uygulamanın root modülüne otoatik sağlanır
})
export class AuthService {

  private apiUrl:string ="http://localhost:5286/api/user";
  constructor(private http: HttpClient) {} //HTTP isteklerini yapmak için DI kullanırlarak HTTPClient
  //enjekte edilir.


  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  getCurrentUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }


  login(credentials: { email:string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/giris`, credentials);
  }
  register(user: { name: string; surname:string; email:string; password: string ; phone:string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/kayit`, user);
  }
  getUserDetails(userid: string): Observable<Object> {
    return this.http.get(`${this.apiUrl}/userdetails/${userid}`);
  }
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        //token çözümleme paket işe yaramadığı için manuel yapıyoruz
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        // Süre kontrolü
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          console.error('Token süresi dolmuş.');
          localStorage.removeItem('token');
          return null;
        }
        return payload.id;
      } catch (error) {
        console.error('Token çözümlenirken bir hata oluştu:', error);
        return null;
      }
    }
    return null;
  }
  updateUser(user: { id: string; name: string; surname: string; phone: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/updateuser`, user);
  }
  getCommentsByUserId(userId: string): Observable<Object> {
    return this.http.get(`${this.apiUrl}/usercomments/${userId}`);
  }
  editComment(edit: {commentId:string,userId:string,content:string}):Observable<any> {
    return this.http.patch(`${this.apiUrl}/updatecomment`, edit);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  clearToken(): void {
    localStorage.removeItem('token');
  }
  getToken():string | null {
    return localStorage.getItem('token');
  }
}
