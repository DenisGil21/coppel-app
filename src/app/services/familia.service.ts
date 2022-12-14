import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FamiliaGet } from '../interfaces/familia.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(private http:HttpClient) { }

  getFamiliasByClase(id: number): Observable<FamiliaGet> {
    return this.http.get<FamiliaGet>(`${base_url}/clases/${id}/familias`);
  }
}
