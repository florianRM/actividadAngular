import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: String[] = [];

  constructor(private http: HttpClient) { }

  get historial(): String[] {
    return [...this._historial];
  }

  buscarGifs(query: String): void {
    const clean = query.trim().toLowerCase();
    if(clean !== '' && !this._historial.includes(clean)) {
      this._historial.unshift(query);
      this._historial.splice(0, 10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=fptLpdrBJWLhTc2jI6xmPGtCTILMvF4O&q=${query}&limit=25&offset=0&rating=g&lang=en`)
    .subscribe(resp => console.log(resp))
  }

}
