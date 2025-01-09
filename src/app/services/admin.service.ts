import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string ="http://localhost:5286/api/admin"
  constructor(private http: HttpClient) { }

  adminAddFilm(film:{filmName:string,filmDesc:string,filmReleaseDate:Date,filmDuration:number,posterPath:string, genres:string[]}): Observable<any> {
    return this.http.post(`${this.apiUrl}/addfilm`, film);
  }
  addActorToFilm(actor:{filmId:string,actorName:string,actorPhoto:string,actorBio:string,actorBirthDate:Date}): Observable<any> {
    return this.http.post(`${this.apiUrl}/addactor`, actor);
  }
  deleteFilm(filmId:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deletefilm/${filmId}`);
  }
  getFilmById(filmId:string):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admingetfilmbyid/${filmId}`);
  }
  updateFilm(film:{filmId:string, filmName:string,filmDesc:string,filmReleaseDate:Date,filmDuration:number,posterPath:string, genres:string[]}):Observable<any>{
    return this.http.put(`${this.apiUrl}/updatefilmbyid/${film.filmId}`, film);
  }
  getActorsByFilmId(filmId:string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actorlistbyfilmid/${filmId}`);
  }
}
