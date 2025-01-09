import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl: string ="http://localhost:5286/api/film"
  constructor(private http: HttpClient) {}

  getAllFilms():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allfilms`); //post olsaydı 2 paramtere bekleyecekti
  }
  getAllGenres():Observable<Object> {
    return this.http.get(`${this.apiUrl}/allgenres`);
  }
  getAllActors():Observable<Object> {
    return this.http.get(`${this.apiUrl}/allactors`);
  }
  getFilmById(filmId:string):Observable<Object> {
    return this.http.get(`${this.apiUrl}/filmdetails/${filmId}`);
  }
  getActorById(actorId:string):Observable<Object> {
    return this.http.get(`${this.apiUrl}/oyuncudetails/${actorId}`);
  }
  getFilmsByCategoryName(categoryName:string):Observable<Object> {
    return this.http.get(`${this.apiUrl}/filmsbycategoryname/${categoryName}`);
  }
  addComment(comment :{userid:string,filmid:string,content:string}):Observable<Object> {
    return this.http.post(`${this.apiUrl}/addcomment`, comment);
  }
  allCommentsByFilmId(filmId:string):Observable<Object> {
    return this.http.get(`${this.apiUrl}/allcommentsbyfilmid/${filmId}`);
  }
  addFilmToList(listRequest:{userid:string,filmid:string}):Observable<Object> {
    return this.http.post(`${this.apiUrl}/addfilmtolist`, listRequest);
  }
  removeFilmFromList(request: { userid: string, filmid: string }): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removefilmfromlist`, { body: request });
  }

}
