import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }

  getCharacterById(id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  getCharacterByPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?page=${page}`);
  }
}
