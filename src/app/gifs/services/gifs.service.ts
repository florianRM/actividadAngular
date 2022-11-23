import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../interfaces/searchResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history: string[] = [];
  private api_key: string = 'fptLpdrBJWLhTc2jI6xmPGtCTILMvF4O';
  private url: string = 'https://api.giphy.com/v1/gifs/search';
  private _results: Gif[] = [];

  constructor(private http: HttpClient) { 
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
  }

  get history(): string[] {
    return [...this._history];
  }

  get results(): Gif[] {
    return [...this._results];
  }

  buscarGifs(query: string): void {
    const clean = query.trim().toLowerCase();
    if(clean !== '' && !this._history.includes(clean)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
    .set('api_key', this.api_key)
    .set('q', query)
    .set('limit', 50);

    this.http.get<GifsSearchResponse>(this.url, {params})
    .subscribe(resp => this._results = resp.data)
  }

}
