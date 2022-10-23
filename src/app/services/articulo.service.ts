import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloGet } from '../interfaces/articulo.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ArticuloService {

  constructor(private http: HttpClient) { }

  getArticulo(sku: number): Observable<ArticuloGet> {
    return this.http.get<ArticuloGet>(`${base_url}/articulos/${sku}`);
  }

  postArticulo(data: any): Observable<ArticuloGet> {
    return this.http.post<ArticuloGet>(`${base_url}/articulos/`, data);
  }

  updateArticulo(sku: number, data: any): Observable<ArticuloGet> {
    return this.http.put<ArticuloGet>(`${base_url}/articulos/${sku}`, data);
  }

  deleteArticulo(sku: number): Observable<any> {
    return this.http.delete<any>(`${base_url}/articulos/${sku}`);
  }
}
