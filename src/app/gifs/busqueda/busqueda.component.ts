import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  query: string = '';

  constructor(private gifsService: GifsService) { }

  buscarGifts(): void {
    this.gifsService.buscarGifs(this.query);
    this.query = '';
  }
}
