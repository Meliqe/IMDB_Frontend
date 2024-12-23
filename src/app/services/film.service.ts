import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl: string ="http://localhost:5286/api/film"
  constructor(private http: HttpClient) {}

  getAllFilms(){
    return this.http.get(`${this.apiUrl}/allfilms`); //post olsaydı 2 paramtere bekleyecekti
  }
}
