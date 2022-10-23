import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClaseGet } from '../interfaces/clase.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http: HttpClient) { }

  getClasesByDepartamento(id: number): Observable<ClaseGet> {
    return this.http.get<ClaseGet>(`${base_url}/departamentos/${id}/clases`);
  }
}
