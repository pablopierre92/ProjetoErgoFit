import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
private apiUrl = `${environment.ApiUrl}/Funcionario`

constructor( private http: HttpClient){ }

GetFuncionarios() : Observable<Response<Funcionario[]>>{
  return this.http.get<Response<Funcionario[]>>(this.apiUrl);
}

}
