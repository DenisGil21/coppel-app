import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartamentoGet } from '../interfaces/departamento.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http:HttpClient) { }

  getDepartamentos():Observable<DepartamentoGet>{
    return this.http.get<DepartamentoGet>(`${base_url}/departamentos`);
  }
}
