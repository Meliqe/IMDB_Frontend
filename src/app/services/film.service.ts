import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl: string ="http://localhost:5286/api/films"
  constructor(private http: HttpClient) {}
}
